import { CreatorsListQueryItem } from '@/utils/graphql/Creators';
import {ChevronRight} from 'lucide-react';
import Link from 'next/link';
import {forwardRef, type ForwardRefRenderFunction, type HTMLAttributes} from 'react';

type CardProps = {
	creator: CreatorsListQueryItem;
} & HTMLAttributes<HTMLDivElement>;

const _Card: ForwardRefRenderFunction<HTMLDivElement, CardProps> = ({className, ...props}, ref) => (
	<div ref={ref} className='card w-full bg-base-200 text-base-content group'>
		<Link href={`/creators/${props.creator.slug}`}>
			<div className='card-body p-4 flex flex-row justify-between group-hover:text-primary'>
				<h2 className='card-title text-base'>
					{props.creator.name}
					<span className='text-sm font-light'>({props.creator.games.count} games)</span>
				</h2>
				<ChevronRight className='w-8 h-8' />
			</div>
		</Link>
	</div>
);

export const CreatorCard = forwardRef(_Card);
