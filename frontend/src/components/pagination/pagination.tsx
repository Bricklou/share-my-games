import classNames from 'classnames';
import {ChevronLeft, ChevronRight} from 'lucide-react';

export type PaginationProps = {
	itemsCount: number;
	pageSize: number;
	currentPage: number;
	onChange: (page: number) => void;
	siblingCount?: number;

};

export function Pagination({itemsCount, pageSize, currentPage, onChange, siblingCount = 2}: PaginationProps): JSX.Element {
	const pagesCount = Math.ceil(itemsCount / pageSize);

	const pages = Array.from({length: pagesCount}, (_, i) => i + 1);

	return (
		<div className='btn-group'>
			{currentPage !== 1 && (
				<button
					className='btn'
					title='Previous page'
					type='button'
					onClick={() => {
						onChange(currentPage - 1);
					}}
				>
					<ChevronLeft/>
				</button>
			)}

			{pages.map(page => {
				// If the page is the first page, the last page, or within the siblingCount of the current page, render the page button
				if (page === 1 || page === pagesCount || (page >= currentPage - siblingCount && page <= currentPage + siblingCount)) {
					return (<button
						key={page}
						className={classNames('btn', {'btn-active': page === currentPage})}
						type='button'
						onClick={() => {
							onChange(page);
						}}
					>
						{page}
					</button>);
				}

				// Otherwise, render an ellipsis
				if (page === currentPage - siblingCount - 1 || page === currentPage + siblingCount + 1) {
					return <button disabled className='btn btn-disabled' key={page} type='button'>...</button>;
				}

				return null;
			})}

			{currentPage !== pagesCount && (
				<button className='btn' title='Next page' type='button' onClick={() => {
					onChange(currentPage + 1);
				}}>
					<ChevronRight/>
				</button>
			)}
		</div>
	);
}
