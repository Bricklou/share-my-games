'use client';

import type {GamePreview} from '@/types/games';
import {Eye, EyeOff} from 'lucide-react';
import {type HTMLAttributes, useCallback, useEffect, useState} from 'react';
import Image from 'next/image';
import {makeUrl} from '@/utils/api';
import useEmblaCarousel from 'embla-carousel-react';
import {Dots} from './dots';
import {GalleryControls} from './galleryControls';
import classNames from 'classnames';
import {ImageOverlay} from './imageOverlay';

import './gallery.css';
import {useShowNsfw} from '@/context/showNsfw';

type GalleryProps = {
	images: GamePreview[];
	onImageClick?: (index: number) => void;
	// The minimum height of the gallery
	minHeight?: number;
	imageFetchWidth?: number;
	currentIndex?: number;
} & HTMLAttributes<HTMLDivElement>;

export function Gallery({
	images,
	onImageClick,
	minHeight = 300,
	imageFetchWidth = window.innerWidth / 2,
	className,
	currentIndex = 0,
	...props
}: GalleryProps): JSX.Element {
	const [emblaRef, emblaApi] = useEmblaCarousel({
		loop: true,
		draggable: true,
		startIndex: currentIndex,
	});
	const [showNsfw, toggleNsfw] = useShowNsfw();

	const [selectedIndex, setSelectedIndex] = useState(currentIndex);

	const onSelect = useCallback((index?: number) => emblaApi?.scrollTo(index ?? 0), [emblaApi]);

	useEffect(() => {
		function selectHandler() {
			const index = emblaApi?.selectedScrollSnap();
			setSelectedIndex(index ?? 0);
		}

		emblaApi?.on('select', selectHandler);

		// Cleanup
		return () => {
			emblaApi?.off('select', selectHandler);
			emblaApi?.destroy();
		};
	}, [currentIndex, emblaApi]);

	const {length} = images;
	const canScrollNext = Boolean(emblaApi?.canScrollNext());
	const canScrollPrev = Boolean(emblaApi?.canScrollPrev());

	return (
		<section className={classNames('relative select-none', className)} {...props}>
			{images[selectedIndex].is_nsfw && (
				<button
					type='button'
					aria-label={showNsfw ? 'Hide NSFW content' : 'Show NSFW content'}
					className='badge badge-error absolute left-2 top-4 gap-1 z-10'
					onClick={toggleNsfw}
				>
					{showNsfw ? <Eye className='w-5 h-5' /> : <EyeOff className='w-5 h-5' />}
                    NSFW
				</button>
			)}
			<div className='overflow-hidden bg-base-200 rounded-md h-full' ref={emblaRef}>
				<div className='flex h-full'>
					{images.map((each, index) => (
						<div key={index} className='relative flex-[0_0_100%] overflow-hidden' style={{minHeight}}>
							<Image
								src={each.preview}
								onClick={() => onImageClick?.(index)}
								alt='Game preview'
								className={classNames('object-contain my-0 relative', {
									'blur-2xl': each.is_nsfw && !showNsfw,
									'cursor-pointer': Boolean(onImageClick),
								})}
								fill
								loader={({src}) => makeUrl(src, {filename: 'preview.png', width: imageFetchWidth})}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								quality={100}
								priority={index === currentIndex}
							/>
						</div>
					))}
				</div>
			</div>

			<Dots itemsLength={length} selectedIndex={selectedIndex} onSelect={onSelect} />

			<GalleryControls
				canScrollNext={canScrollNext}
				canScrollPrev={canScrollPrev}
				onNext={() => emblaApi?.scrollNext()}
				onPrev={() => emblaApi?.scrollPrev()}
			/>
		</section>
	);
}

export function GalleryWithPreview(props: Omit<GalleryProps, 'onImageClick'>): JSX.Element {
	const [showOverlay, setShowOverlay] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [imageFetchWidth, setImageFetchWidth] = useState(window.innerWidth);

	useEffect(() => {
		function handleResize() {
			// Only update if the width changes of 50px to prevent unnecessary re-renders
			if (Math.abs(window.innerWidth - imageFetchWidth) > 300) {
				setImageFetchWidth(window.innerWidth);
			}
		}

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [imageFetchWidth]);

	return (
		<>
			<Gallery
				onImageClick={index => {
					setSelectedIndex(index);
					setShowOverlay(true);
				}}
				{...props}
				imageFetchWidth={Math.floor(imageFetchWidth / 2)}
			/>
			{showOverlay && (
				<ImageOverlay
					onClose={() => {
						setShowOverlay(false);
					}}
					currentIndex={selectedIndex}
					images={props.images}
					imageFetchWidth={imageFetchWidth}
				/>
			)}
		</>
	);
}
