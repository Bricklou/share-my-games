'use client';
import 'client-only';

import {type PropsWithChildren, useState} from 'react';
import {NsfwContextProvider} from './showNsfw';
import {ThemeProvider} from 'next-themes';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

export function AppProviders(props: PropsWithChildren): JSX.Element {
	const [queryClient] = useState(() => new QueryClient());

	return (
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<NsfwContextProvider>
					{props.children}
				</NsfwContextProvider>
			</QueryClientProvider>
		</ThemeProvider>
	);
}
