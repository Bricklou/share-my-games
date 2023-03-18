import classNames from 'classnames';
import {ArrowLeft, ArrowRight} from 'lucide-react';

export type GalleryControlsProps = {
	canScrollPrev: boolean;
	canScrollNext: boolean;
	onPrev(): void;
	onNext(): void;
};

export function GalleryControls(props: GalleryControlsProps): JSX.Element {
	return (
		<div className='absolute top-1/2 -translate-y-5 w-full flex justify-between px-2 pointer-events-none'>
			<button
				type='button'
				title='Previous image'
				onClick={() => {
					if (props.canScrollPrev) {
						props.onPrev();
					}
				}}
				disabled={!props.canScrollPrev}
				className={classNames('btn btn-circle btn-secondary pointer-events-auto', {
					hidden: !props.canScrollPrev,
				})}
				hidden={!props.canScrollPrev}
			>
				<ArrowLeft size={32} />
			</button>
			<button
				type='button'
				title='Next image'
				onClick={() => {
					if (props.canScrollNext) {
						props.onNext();
					}
				}}
				disabled={!props.canScrollNext}
				className={classNames('btn btn-circle btn-secondary pointer-events-auto', {
					hidden: !props.canScrollNext,
				})}
				hidden={!props.canScrollNext}
			>
				<ArrowRight size={32} />
			</button>
		</div>
	);
}
