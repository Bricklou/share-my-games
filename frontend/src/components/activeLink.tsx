'use client';

import {usePathname} from 'next/navigation';
import Link, {type LinkProps} from 'next/link';
import React, {type PropsWithChildren, useState, useEffect} from 'react';

type ActiveLinkProps = LinkProps & {
	className?: string;
	activeClassName: string;
};

const ActiveLink = ({
	children,
	activeClassName,
	className,
	...props
}: PropsWithChildren<ActiveLinkProps>) => {
	const pathname = usePathname();
	const [computedClassName, setComputedClassName] = useState(className);

	useEffect(() => {
		// Check if the pathname field is available
		if (pathname) {
		// Dynamic route will be matched via props.as
		// Static route will be matched via props.href
			const linkPathname = new URL(
				(props.as ?? props.href) as string,
				location.href,
			).pathname;

			// Using URL().pathname to get rid of query and hash
			const activePathname = new URL(pathname, location.href).pathname;

			const newClassName = linkPathname === activePathname ? `${className ?? ''} ${activeClassName}`.trim() : className;

			if (newClassName !== computedClassName) {
				setComputedClassName(newClassName);
			}
		}
	}, [
		pathname,
		props.as,
		props.href,
		activeClassName,
		className,
		computedClassName,
	]);

	return (
		<Link className={computedClassName} {...props}>
			{children}
		</Link>
	);
};

export default ActiveLink;
