'use client';

import {Moon, Sun} from '@/components/icons';
import {useTheme} from 'next-themes';
import {useCallback} from 'react';

export function ThemeButton(): JSX.Element {
	const {theme, setTheme} = useTheme();

	const onClick = useCallback(() => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	}, [theme, setTheme]);

	return (
		<button
			type='button'
			className='btn btn-ghost btn-circle'
			title={`Toggle theme to ${theme === 'dark' ? 'light' : 'dark'} mode`}
			onClick={onClick}
		>
			{theme === 'light' ? <Sun/> : <Moon/>}
		</button>
	);
}
