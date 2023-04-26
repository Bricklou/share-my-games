'use client';

import {useQuery} from '@tanstack/react-query';
import {type GetGameResult, getGame} from '@/utils/api/games';
import {notFound} from 'next/navigation';
import {Rating} from '@/components/rating/rating';
import {SiDiscord, SiPatreon, SiItchdotio, SiSteam, Check, Construction, Globe, TwitterIcon} from '@/components/icons';
import {GalleryWithPreview} from '@/components/gallery/galleryOverlay';
import classNames from 'classnames';
import {type SocialNetwork} from '@/utils/graphql/Games';

type GameProps = {
	data: GetGameResult;
};

function toSocialLink(social: SocialNetwork): JSX.Element | undefined {
	let icon: React.ReactNode;
	let name: string;

	switch (social.type) {
		case 'discord':
			icon = <SiDiscord />;
			name = 'Discord';
			break;
		case 'patreon':
			icon = <SiPatreon />;
			name = 'Patreon';
			break;
		case 'itch':
			icon = <SiItchdotio />;
			name = 'Itch.io';
			break;
		case 'website':
			icon = <Globe />;
			name = 'Website';
			break;
		case 'twitter':
			icon = <TwitterIcon />;
			name = 'Twitter';
			break;
		case 'steam':
			icon = <SiSteam/>;
			name = 'Steam';
			break;
		default:
			icon = <Globe />;
			name = social.type[0].toUpperCase() + social.type.substring(1);
	}

	return (
		<li key={social.id} className='text-sm'>
			<a className='link link-primary inline-flex items-center gap-4' href={social.link}>
				{icon}
				{name}
			</a>
		</li>
	);
}

export function GameView(props: GameProps) {
	const {slug} = props.data;

	const {data} = useQuery({
		queryKey: ['game', slug],
		queryFn: async ({queryKey}) => getGame(queryKey[1]),
		initialData: props.data,
	});

	if (!data) {
		return notFound();
	}

	return (
		<article className='prose md:prose-lg lg:prose-xl w-full max-w-none'>
			<header className='flex flex-col md:flex-row items-center mb-4'>
				<h1 className='uppercase mb-2 md:mb-0 lg:mb-0'>{data.name}</h1>

				<Rating
					value={data.rating ?? 0}
					max={10}
					name={data.slug}
					className='ml-4 rounded bg-base-200 p-2 px-4 md:rounded-none md:bg-transparent md:p-0'
				/>
			</header>
			<p className='text-sm m-4 text-center md:text-left'>
                By <span className='italic'>{data.creator.name}</span>
				{' - '}
                Published the {new Date(data.published_at).toLocaleDateString()}
			</p>

			<div className='px-4 md:px-8 w-full'>
				<div className='flex flex-col lg:flex-row-reverse gap-x-16'>
					<aside className='card bg-base-300 lg:max-w-xs w-full not-prose lg:sticky lg:top-32 mb-auto'>
						<div className='card-body'>
							{data.socials.length > 0 && (
								<>
									<h2 className='card-title'>Socials</h2>
									<ul className='flex flex-col gap-2 px-4'>
										{data.socials.map(social => toSocialLink(social))}
									</ul>
								</>
							)}
							<h2 className='card-title'>Development Status</h2>
							<span
								className={classNames('badge gap-2', {
									'badge-primary': data.dev_finished,
									'badge-primary badge-outline': !data.dev_finished,
								})}
							>
								{data.dev_finished ? (
									<>
										<Check className='w-5 h-5' />
                                        Finished
									</>
								) : (
									<>
										<Construction className='w-5 h-5' />
                                        Work In Progress
									</>
								)}
							</span>
							<h2 className='card-title'>Tags</h2>
							<div className='flex flex-row flex-wrap gap-2'>
								{data.tags.map(tag => (
									<div key={tag.tags_id.slug} className='badge badge-primary grow shrink'>
										{tag.tags_id.name}
									</div>
								))}
							</div>
						</div>
					</aside>

					<section className='flex-1'>
						<div className='py-4 not-prose mb-8'>
							{data.previews && (
								<GalleryWithPreview
									images={data.previews}
									minHeight={300}
									className='md:h-[35vh] lg:h-[27vh] xl:h-[38vh] 2xl:h-[50vh] max-h-[50vh] h-full'
								/>
							)}
						</div>
						<div className='prose max-w-none' dangerouslySetInnerHTML={{__html: data.description}}></div>
					</section>
				</div>
			</div>
		</article>
	);
}
