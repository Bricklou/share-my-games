'use client';

import type {GamePreview} from '@/types/games';
import {ArrowLeft, ArrowRight} from 'lucide-react';
import {useState} from 'react';
import Image from 'next/image';
import {makeUrl} from '@/utils/api';

import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

type GalleryProps = {
	images: GamePreview[];
};

export function Gallery(props: GalleryProps): JSX.Element {
	return (
		<section className='m-10'>
			<CarouselProvider
				naturalSlideWidth={300}
				naturalSlideHeight={300}
				className='w-full mx-auto relative'
				totalSlides={props.images.length}
				infinite={true}
				visibleSlides={1.2}
			>
				<Slider className='w-full relative h-min p-0'>
					{props.images.map((each, index) => (
						<Slide key={index} index={index} className='h-auto mx-2'>
							<Image
								className='w-full object-contain rounded-lg shadow-xl h-[300px] bg-base-200 cursor-pointer'
								alt='Game preview'
								src={makeUrl(each.preview)}
								width={300}
								height={300}
							/>
						</Slide>
					))}
				</Slider>
				<ButtonBack className='btn btn-circle absolute top-1/2 left-10' >
					<ArrowLeft size={32} />
				</ButtonBack>
				<ButtonNext className='btn btn-circle absolute top-1/2 right-10'>
					<ArrowRight size={32} />
				</ButtonNext>
			</CarouselProvider>
		</section>
	);
}
