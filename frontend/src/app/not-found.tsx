import Link from 'next/link';
import {ArrowLeft} from '@/components/icons';

export default function NotFound(): JSX.Element {
	return (
		<div className='w-full flex-1 flex flex-col justify-center items-center'>
			<div className='w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center'>
				<p className='text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300'>404</p>
				<p className='text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-gray-300 mt-2'>
                    Page Not Found
				</p>
				<p className='text-lg md:text-xl lg:text-2xl text-gray-500 my-12'>
                    Sorry, the page you are looking for could not be found.
				</p>
				<Link href='/'
					className='btn btn-primary gap-x-2 items-center'
					title='Return Home'
				>
					<ArrowLeft className='h-5 w-5'/>
					<span>Return Home</span>
				</Link>
			</div>
		</div>
	);
}
