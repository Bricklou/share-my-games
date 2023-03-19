import {Menu} from 'lucide-react';
import Link from 'next/link';
import {SearchInput} from './search';
import {NsfwToggle} from './nsfwToggle';

export function NavBar(): JSX.Element {
	return (
		<div className='border-b bg-base-200 sticky top-0 z-50'>
			<div className='navbar container mx-auto py-3'>
				<div className='navbar-start md:hidden'>
					<div className='dropdown'>
						<span role='menu' tabIndex={0} className='btn btn-ghost btn-circle'>
							<Menu />
						</span>
						<ul
							role='menu'
							tabIndex={0}
							className='menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box w-52'
						>
							<li role='menuitem'>
								<Link href='/'>Home</Link>
							</li>
						</ul>
					</div>
				</div>

				<div className='navbar-center md:navbar-start'>
					<Link href='/' className='normal-case text-xl btn btn-ghost'>
                        Sharing my games
					</Link>
				</div>

				<div className='navbar-end md:mr-2'>
					<NsfwToggle />
					<SearchInput />
				</div>
			</div>
		</div>
	);
}
