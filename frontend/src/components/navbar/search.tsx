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

	const listRef = useRef<HTMLUListElement>(null);
	const [currentIndex, setCurrentIndex] = useState(-1);
	const inputRef = useRef<HTMLInputElement>(null);

	const exitSearch = () => {
		setSearching(false);
		setSearchText('');
	};

	const focusNewItem = useCallback(() => {
		if (currentIndex === -1) {
			inputRef.current?.focus();
			return;
		}

		const item = listRef.current?.querySelector(`li:nth-child(${currentIndex + 1}) a`);
		if (item && item instanceof HTMLAnchorElement) {
			item.focus();
		}
	}, [currentIndex]);

	const onKeyPressed = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'k' && event.ctrlKey) {
				event.preventDefault();
				setSearching(!searching);
				return;
			}

			if (!searching) {
				return;
			}

			switch (event.key) {
				case 'Tab':
					{
						event.preventDefault();
						const direction = event.shiftKey ? -1 : 1;

						if (!searchResults.length) {
							// If there are no results, focus the input
							setCurrentIndex(-1);
						} else if (direction === -1 && currentIndex > -1) {
							// If we're going backwards and we're not on the input, go to the input
							setCurrentIndex(currentIndex + direction);
						} else if (direction === 1) {
							if (currentIndex < searchResults.length - 1) {
								// If we're going forwards and we're not on the last item, go to the next item
								setCurrentIndex(currentIndex + direction);
							} else {
								// Otherwise, go to the first item
								setCurrentIndex(0);
							}
						}
					}

					break;
				case 'Escape':
					event.preventDefault();
					// Close the dialog
					exitSearch();

					break;

				case 'ArrowDown':
					event.preventDefault();
					if (currentIndex < searchResults.length - 1) {
						// If we're not on the last item, go to the next item
						setCurrentIndex(currentIndex + 1);
					} else {
						// Otherwise, go to the first item
						setCurrentIndex(0);
					}

					break;

				case 'ArrowUp':
					event.preventDefault();
					if (currentIndex > -1) {
						// If we're not on the input, go to the previous item
						setCurrentIndex(currentIndex - 1);
					}

					break;

				case 'Enter':
					// Click on the current item in the list
					event.preventDefault();
					if (inputRef.current === document.activeElement) {
						const item = listRef.current?.querySelector(`li:nth-child(${currentIndex + 1}) a`);
						if (item instanceof HTMLLIElement) {
							item.click();
						}
					}

					break;

				default:
					inputRef.current?.focus();
			}
		},
		[currentIndex, searchResults.length, searching],
	);

	useEffect(() => {
		focusNewItem();
	}, [currentIndex, focusNewItem]);

	useEffect(() => {
		document.addEventListener('keydown', onKeyPressed);

		return () => {
			document.removeEventListener('keydown', onKeyPressed);
		};
	}, [inputRef, onKeyPressed]);

	useEffect(() => {
		if (searching) {
			inputRef.current?.focus();
		} else {
			inputRef.current?.blur();
			setSearchText('');
			setCurrentIndex(-1);
		}
	}, [searching]);

	useEffect(() => {
		if (!searching || !searchText) {
			setSearchResults([]);
			setCurrentIndex(-1);
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
		<dialog
			aria-label='search dialog'
			className='bg-transparent top-0 left-0 fixed h-screen w-screen z-50 p-4 md:flex md:flex-col md:justify-center'
		>
			<button
				type='button'
				aria-label='dialog exit'
				onClick={() => {
					exitSearch();
				}}
				className='bg-opacity-70 bg-base-100 h-screen w-screen top-0 left-0 fixed cursor-default'
			></button>

			<div className='relative top-10 md:-top-40 z-10 px-4 md:mx-auto max-w-screen-md w-full'>
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

					{searchResults.length > 0 && (
						<ul className='absolute bg-base-300 gap-2 mt-2 w-full' ref={listRef}>
							{searchResults.map(game => (
								<li key={game.id} className='px-4 py-2 hover:bg-primary hover:text-primary-content focus-within:bg-primary focus-within:text-primary-content'>
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
		</dialog>
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
