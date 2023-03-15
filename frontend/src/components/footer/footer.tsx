export function Footer(): JSX.Element {
	return (
		<footer className='footer footer-left p-4 bg-base-300 text-base-content'>
			<div className='flex container mx-auto justify-between items-center'>
				<p>Copyright &copy; {new Date().getFullYear()}</p>
				<p>Made with ❤ by a mysterious wanederer who love games</p>

				<p className='italic'>
                    Commit:{' '}
					<span className='text-primary-500'>
						{process.env.NEXT_PUBLIC_COMMIT_VERSION
							? process.env.NEXT_PUBLIC_COMMIT_VERSION
							: 'development'}
					</span>
				</p>
			</div>
		</footer>
	);
}
