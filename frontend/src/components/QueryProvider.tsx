'use client';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {type PropsWithChildren, useState} from 'react';

export function QueryProvider(props: PropsWithChildren): JSX.Element {
	const [queryClient] = useState(() => new QueryClient());
	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
		</QueryClientProvider>
	);
}
