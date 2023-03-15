'use client';

import {type GameSearchResult, searchGames} from '@/utils/api/games';
import {Search} from 'lucide-react';
import Link from 'next/link';
import {useCallback, useEffect, useRef, useState, type HTMLAttributes} from 'react';
import {FormInput} from '../input/input';

export type SearchInputProps = Record<string, unknown> & HTMLAttributes<HTMLDivElement>;

export function SearchInput(props: SearchInputProps): JSX.Element {
	const [searching, setSearching] = useState(false);
	const [searchText, setSearchText] = useState('');
	const [searchResults, setSearchResults] = useState<GameSearchResult[]>([]);

	const inputRef = useRef<HTMLInputElement>(null);

	const exitSearch = () => {
		setSearching(false);
		setSearchText('');
	};

	const onKeyPressed = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && searching) {
				event.preventDefault();
				exitSearch();
			}

			if (event.key === 'k' && event.ctrlKey) {
				event.preventDefault();
				setSearching(!searching);
			}
		},
		[searching],
	);

	useEffect(() => {
		document.addEventListener('keydown', onKeyPressed);

		return () => {
			document.removeEventListener('keydown', onKeyPressed);
		};
	}, [inputRef, onKeyPressed]);

	useEffect(() => {
		if (searching) {
			inputRef.current?.focus();
		}
	}, [searching]);

	useEffect(() => {
		if (!searching || !searchText) {
			setSearchResults([]);
			return;
		}

		const timeout = setTimeout(async () => {
			try {
				const result = await searchGames(searchText);
				setSearchResults(result);
			} catch (error) {
				console.error(error);
			}
		}, 500);

		return () => {
			clearTimeout(timeout);
		};
	}, [searching, searchText]);

	function highlightWord(text: string, word: string): string {
		return text.replace(new RegExp(word, 'gi'), match => `<mark>${match}</mark>`);
	}

	const showDialog = () => (
		<div
			role='dialog'
			title='search dialog'
			className='top-0 left-0 fixed h-screen w-screen z-50 p-4 md:flex md:flex-col md:justify-center'
		>
			<button
				type='button'
				aria-label='dialog exit'
				onClick={() => {
					exitSearch();
				}}
				className='bg-opacity-70 bg-base-100 h-screen w-screen top-0 left-0 fixed cursor-default'
			></button>

			<div className='-top-40 z-10 mx-auto max-w-screen-md w-full relative'>
				<div className='relative'>
					<FormInput
						ref={inputRef}
						name='search'
						type='search'
						placeholder='Search'
						autoComplete='off'
						className='bg-base-200'
						onChange={event => {
							setSearchText(event.target.value);
						}}
						title='search input'
					/>
					<span
						className='absolute right-6 top-0 h-full py-2 gap-x-1 pointer-events-none inline-flex'
						aria-label='keyboard shortcut'
					>
						<kbd className='kbd kbd-md rounded-md'>ctrl</kbd>
						<kbd className='kbd kbd-md rounded-md'>k</kbd>
					</span>
				</div>

				{searchResults.length > 0 && (
					<ul className='absolute bg-base-300 gap-2 mt-2 w-full'>
						{searchResults.map(game => (
							<li key={game.id} className='px-4 py-2 hover:bg-primary hover:text-primary-content'>
								<Link
									className='text-left block'
									href={`/game/${game.slug}`}
									replace={true}
									onClick={() => {
										exitSearch();
									}}
								>
									<p
										className='font-bold'
										dangerouslySetInnerHTML={{__html: highlightWord(game.name, searchText)}}
									/>
									<p className='text-sm'>
										<span
											className='italic'
											dangerouslySetInnerHTML={{__html: highlightWord(game.slug, searchText)}}
										/>
										{' - '}
										<span
											dangerouslySetInnerHTML={{
												__html: highlightWord(game.creator.name, searchText),
											}}
										/>
									</p>
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);

	return (
		<div {...props}>
			<button
				type='button'
				className='btn btn-ghost btn-circle'
				title='Search button'
				onClick={() => {
					setSearching(true);
				}}
			>
				<Search />
			</button>

			{searching && showDialog()}
		</div>
	);
}
