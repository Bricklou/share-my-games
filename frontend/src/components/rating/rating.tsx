import classNames from 'classnames';
import {type HTMLAttributes} from 'react';

export type RatingProps = {
	value: number;
	max: number;
	name: string;
} & HTMLAttributes<HTMLDivElement>;

export function Rating({value, max, name, className, ...props}: RatingProps): JSX.Element {
	return (
		<div
			className={classNames('rating rating-half tooltip tooltip-bottom mt-2', className)}
			{...props}
			data-tip={`Rating: (${value}/${max})`}
			aria-label={`Rating: (${value}/${max})`}
		>
			{[...Array<number>(max)].map((_, index) => {
				const ratingValue = index + 1;
				return (
					<input
						aria-hidden='true'
						key={index}
						type='radio'
						name={`rating-${name}`}
						className={classNames('mask mask-star-2 bg-orange-400 cursor-default', {
							'mask-half-2': index % 2 !== 0,
							'mask-half-1': index % 2 === 0,
						})}
						checked={value === ratingValue}
						disabled
					/>
				);
			})}
		</div>
	);
}
