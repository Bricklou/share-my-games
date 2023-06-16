import type React from 'react';
import {NavBar} from '@/components/navbar/navbar';
import {type Metadata} from 'next';
import './globals.css';
import {getGlobals} from '@/utils/api';
import {Footer} from '@/components/footer/footer';
import {type PropsWithChildren} from 'react';
import {AppProviders} from '@/context/Providers';
import Script from 'next/script';

export async function generateMetadata(): Promise<Metadata> {
	try {
		const globals = await getGlobals();

		return {
			title: globals.project_name,
			description: globals.project_descriptor,
			openGraph: {
				title: globals.project_name,
				description: globals.project_descriptor,
				type: 'website',
			},
			twitter: {
				title: globals.project_name,
				card: 'summary_large_image',
			},
		} satisfies Metadata;
	} catch (e) {
		console.error('Error fetching metadata:', e);
		return {
			title: 'Sharing my games',
			description: 'Simple website to share all the kinky games I played. UwU',
		};
	}
}

export default async function RootLayout({children}: PropsWithChildren) {
	return (
		<html lang='en'>
			<body className='min-h-screen m-0 p-0 flex flex-col'>
				<AppProviders>
					<NavBar/>
					{children}
					<Footer />
				</AppProviders>
			</body>
			<Script src='/api/url' type='application/javascript' strategy='beforeInteractive' />
		</html>
	);
}
