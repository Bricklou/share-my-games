'use client';

import {type PropsWithChildren} from 'react';
import {ThemeProvider as TProvider} from 'next-themes';

export function ThemeProvider({children}: PropsWithChildren) {
	return <TProvider>{children}</TProvider>;
}
