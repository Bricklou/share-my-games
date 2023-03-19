import {
	forwardRef,
	type ForwardRefRenderFunction,
	type InputHTMLAttributes,
} from 'react';
import classnames from 'classnames';

type InputProps = {
	name: string;
	ref: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
	{name, className, ...props},
	ref,
) => (
	<div className='form-control'>
		<input
			className={classnames('appearance-none input input-bordered', className)}
			{...props}
			name={name}
			ref={ref}
		/>
	</div>
);

export const FormInput = forwardRef(Input);
