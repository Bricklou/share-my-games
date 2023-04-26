import {useEffect} from 'react';
import {Gallery} from './gallery';
import {type Preview} from '@/utils/graphql/Games';

export type ImageOverlayProps = {
	onClose: () => void;
	images: Preview[];
	currentIndex?: number;
	imageFetchWidth?: number;
};

export function ImageOverlay({currentIndex = 0, imageFetchWidth, ...props}: ImageOverlayProps): JSX.Element {
	useEffect(() => {
		document.body.classList.add('overflow-hidden');

		return () => {
			document.body.classList.remove('overflow-hidden');
		};
	});

	return (
		<dialog aria-label='image preview dialog' className='bg-transparent top-0 left-0 fixed h-screen w-screen z-50 p-4 flex flex-col justify-center'>
			<button
				type='button'
				aria-label='dialog exit'
				onClick={() => {
					props.onClose();
				}}
				className='bg-opacity-70 bg-base-100 h-screen w-screen top-0 left-0 fixed cursor-default'
			></button>

			<div className='relative px-4 md:mx-auto max-w-screen-2xl w-full flex flex-col justify-center min-h-[70vh]'>
				<Gallery images={props.images} minHeight={500} className='h-full' currentIndex={currentIndex} imageFetchWidth={imageFetchWidth} />
			</div>
		</dialog>
	);
}
