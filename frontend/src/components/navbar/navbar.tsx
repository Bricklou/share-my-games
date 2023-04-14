import {Menu} from 'lucide-react';
import Link from 'next/link';
import {SearchInput} from './search';
import {NsfwToggle} from './nsfwToggle';
import {FeedButton} from './feedButton';
import ActiveLink from '../activeLink';
import {ThemeButton} from './themeButton';

export function NavBar(): JSX.Element {
	return (
		<div className='border-b border-base-300 bg-base-200 sticky top-0 z-50'>
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
								<ActiveLink href='/' activeClassName='text-primary'>Home</ActiveLink>
							</li>
							<li role='menuitem'>
								<ActiveLink href='/creators' activeClassName='text-primary'>Creators</ActiveLink>
							</li>
						</ul>
					</div>
				</div>

				<div className='navbar-center md:navbar-start'>
					<Link href='/' className='normal-case text-xl btn btn-ghost'>
                        Sharing my games
					</Link>

					<div className='hidden md:flex'>
						<Link href='/creators' className='btn btn-ghost'>
                            Creators
						</Link>
					</div>
				</div>

				<div className='navbar-end md:mr-2'>
					<ThemeButton/>
					<FeedButton/>
					<NsfwToggle />
					<SearchInput />
				</div>
			</div>
		</div>
	);
}
