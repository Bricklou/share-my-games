import classNames from 'classnames';

export type DotsProps = {
	itemsLength: number;
	selectedIndex: number;
	onSelect: (index: number) => void;
};

export function Dots(props: DotsProps): JSX.Element {
	const arr = new Array(props.itemsLength).fill(0);

	return (
		<div className='flex gap-2 my-2 justify-center event'>
			{arr.map((_, index) => {
				const selected = index === props.selectedIndex;
				return (
					<button
						aria-label={`Slide ${index + 1} of ${props.itemsLength}`}
						type='button'
						onClick={() => {
							props.onSelect(index);
						}}
						className={classNames('h-2 w-4 rounded-full transition-all duration-300 bg-primary', {
							// Tune down the opacity if slide is not selected
							'opacity-50': !selected,
						})}
						key={index}
					></button>
				);
			})}
		</div>
	);
}
