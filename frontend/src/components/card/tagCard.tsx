import {type Tag} from '@/types/games';
import {ChevronRight} from 'lucide-react';
import Link from 'next/link';
import {forwardRef, type ForwardRefRenderFunction, type HTMLAttributes} from 'react';

type CardProps = {
	tag: Tag;
} & HTMLAttributes<HTMLDivElement>;

const _Card: ForwardRefRenderFunction<HTMLDivElement, CardProps> = ({className, ...props}, ref) => (
	<div ref={ref} className='card w-full bg-base-200 text-base-content group'>
		<Link href={`/tags/${props.tag.slug}`}>
			<div className='card-body p-4 flex flex-row justify-between group-hover:text-primary'>
				<h2 className='card-title text-base'>
					{props.tag.name}
					<span className='text-sm font-light'>({props.tag.games?.length} games)</span>
				</h2>
				<ChevronRight className='w-8 h-8' />
			</div>
		</Link>
	</div>
);

export const TagCard = forwardRef(_Card);
