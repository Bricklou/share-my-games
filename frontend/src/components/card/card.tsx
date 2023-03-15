'use client';

import {type Game} from '@/types/games';
import classNames from 'classnames';
import {Clock, User} from 'lucide-react';
import Link from 'next/link';
import {forwardRef, type ForwardRefRenderFunction, type HTMLAttributes} from 'react';
import {Rating} from '../rating/rating';

type CardProps = {
	game: Game;
} & HTMLAttributes<HTMLDivElement>;

const _Card: ForwardRefRenderFunction<HTMLDivElement, CardProps> = ({className, ...props}, ref) => {
	const isNew = new Date(props.game.create_at) < new Date();

	return (
		<div className={classNames('card bg-base-200', className)}>
			<div className='card-body pb-4'>
				<h2 className='card-title'>
					<Link href={`/game/${props.game.slug}`} className='link link-primary link-hover'>
						{props.game.name}
					</Link>
					{isNew && <span className='badge badge-success ml-2'>New</span>}
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

export const Card = forwardRef(_Card);
