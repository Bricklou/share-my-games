'use client';

import {useShowNsfw} from '@/context/showNsfw';
import {type Game} from '@/types/games';
import {makeUrl} from '@/utils/api';
import classNames from 'classnames';
import {Clock, User} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {forwardRef, type ForwardRefRenderFunction, type HTMLAttributes} from 'react';
import {Rating} from '../rating/rating';

type CardProps = {
	game: Game;
} & HTMLAttributes<HTMLDivElement>;

const _Card: ForwardRefRenderFunction<HTMLDivElement, CardProps> = ({className, ...props}, ref) => {
	// Is newly added if the game was created in the last 3 days
	const isNew = new Date(props.game.create_at).getTime() > new Date().getTime() - (3 * 24 * 60 * 60 * 1000);
	const [showNsfw] = useShowNsfw();

	return (
		<div className={classNames('card bg-base-200', className)} ref={ref}>
			{props.game.previews && (
				<figure className='h-48 relative bg-base-300'>
					<Link href={`/game/${props.game.slug}`} className='link link-primary link-hover'>
						<Image
							src={makeUrl(props.game.previews[0].preview)}
							alt='Game preview'
							className={classNames('object-cover relative scale-105', {
								'blur-2xl': props.game.previews[0].is_nsfw && !showNsfw,
							})}
							fill
							sizes='100%'
							quality={100}
						/>
					</Link>
				</figure>
			)
			}
			<div className='card-body py-4'>
				<h2 className='card-title'>
					<Link href={`/game/${props.game.slug}`} className='link link-primary link-hover'>
						{props.game.name}
					</Link>
					{isNew && (
						<span className='badge badge-success relative animate-pulse'>New</span>
					)}
				</h2>

				<div className='flex flex-col gap-2 mt-2 mx-4 items-left'>
					<div className='divider my-0'></div>

					<div
						className='inline-flex items-center tooltip tooltip-bottom'
						data-tip='Creator'
						aria-label='Creator'
					>
						<User className='inline-block w-6 h-6' />
						<span className='ml-2'>{props.game.creator.name}</span>
					</div>
					<div className='divider divider-horizontal mx-0 md:mx-2'></div>
					<div
						className='inline-flex items-center tooltip tooltip-bottom'
						data-tip='Published date'
						aria-label='Published date'
					>
						<Clock className='inline-block w-6 h-6' />
						<span className='ml-2 italic'>{new Date(props.game.published_at).toLocaleDateString()}</span>
					</div>

					<div className='divider my-0'></div>
					{props.game.rating ? (
						<Rating value={props.game.rating} max={10} name={props.game.slug} />
					) : (
						<div className='text-center italic'>The game has not been rated yet.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export const GameCard = forwardRef(_Card);
