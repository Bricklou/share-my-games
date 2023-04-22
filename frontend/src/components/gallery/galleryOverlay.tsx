'use client';

import {useEffect, useState} from 'react';
import {Gallery, type GalleryProps} from './gallery';
import {ImageOverlay} from './imageOverlay';

export function GalleryWithPreview(props: Omit<GalleryProps, 'onImageClick'>): JSX.Element {
	const [showOverlay, setShowOverlay] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [imageFetchWidth, setImageFetchWidth] = useState<number>(0);

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

	useEffect(() => {
		setImageFetchWidth(window.innerWidth);
	}, []);

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
