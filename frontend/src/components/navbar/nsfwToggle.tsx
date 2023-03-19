'use client';
import {Eye, EyeOff} from 'lucide-react';
import {useShowNsfw} from '@/context/showNsfw';

export function NsfwToggle(): JSX.Element {
	const [showNsfw, toggleNsfw] = useShowNsfw();

	return (
		<button
			type='button'
			className='btn btn-ghost btn-circle'
			aria-label={showNsfw ? 'Hide NSFW content' : 'Show NSFW content'}
			onClick={() => {
				toggleNsfw();
			}}
		>
			<div className='indicator'>
				<span className='indicator-item badge badge-error scale-75'>+18</span>
				<span className='place-items-center'>
					{showNsfw ? <Eye/> : <EyeOff/>}
				</span>
			</div>
		</button>
	);
}
