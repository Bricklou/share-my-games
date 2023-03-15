import type React from 'react';
import {NavBar} from '@/components/navbar/navbar';
import {QueryProvider} from '@/components/QueryProvider';
import {type Metadata} from 'next';
import './globals.css';
import {getGlobals} from '@/utils/api';
import {Footer} from '@/components/footer/footer';

export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 600;

export async function generateMetadata(): Promise<Metadata> {
	try {
		const globals = await getGlobals();

		return {
			title: globals.project_name,
			description: globals.project_descriptor,
		};
	} catch (e) {
		return {
			title: 'Sharing my games',
			description: 'Simple website to share all the kinky games I played. UwU',
		};
	}
}

export default async function RootLayout({children}: {children: JSX.Element}) {
	return (
		<html lang='en'>
			<body className='min-h-screen m-0 p-0 flex flex-col'>
				<QueryProvider>
					<NavBar />
					{children}
					<Footer />
				</QueryProvider>
			</body>
		</html>
	);
}
