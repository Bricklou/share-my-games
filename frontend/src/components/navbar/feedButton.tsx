'use client';

import classNames from 'classnames';
import {RssIcon} from 'lucide-react';
import {useCallback, useRef, useState} from 'react';

export function FeedButton(): JSX.Element {
	const [open, setOpen] = useState(false);
	const feedUrl = `${window.location.origin}/feed`;
	const setTimeoutRef = useRef<number>();

	const onClick = useCallback(() => {
		if (setTimeoutRef.current) {
			clearTimeout(setTimeoutRef.current);
			setTimeoutRef.current = undefined;
		}

		setOpen(!open);

		setTimeoutRef.current = window.setTimeout(() => {
			setOpen(false);

			clearTimeout(setTimeoutRef.current);
			setTimeoutRef.current = undefined;
		}, 2000);
	}, [open, setOpen, setTimeoutRef]);

	return (
		<div className={classNames('tooltip tooltip-bottom', {'tooltip-open': open})} data-tip={open ? 'Feed url copied to clipboard' : undefined}>
			<button type='button' className='btn btn-ghost btn-circle' title='Copy Atom feed url' onClick={async () => {
				await navigator.clipboard.writeText(feedUrl).then(onClick);
			}}>
				<RssIcon/>
			</button>
		</div>
	);
}
