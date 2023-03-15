import {forwardRef, type ForwardRefRenderFunction, type SelectHTMLAttributes} from 'react';
import classNames from 'classnames';

type SelectProps = {
	name: string;
	ref: string;
	parentClass?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
	{name, className, parentClass, ...props},
	ref,
) => (
	<div className={classNames('form-control', parentClass)}>
		<select className={classNames('select select-bordered', className)} {...props} name={name} ref={ref} />
	</div>
);

export const FormSelect = forwardRef(Select);
