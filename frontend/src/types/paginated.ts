export type Paginated<T> = {
    // If T is already an array, skip the conversion and just return T
    // Otherwise, convert T to an array
	data: T extends (infer U)[] ? U[] : T;
	meta: {
		itemsCount: number;
		pageSize: number;
		page: number;
	};
};

export type SearchParams = Record<string, string | string[] | undefined>;

export function getPageNumber(params: SearchParams): number {
	if (
		params.page
        && typeof params.page === 'string'
	) {
		const n = parseInt(params.page, 10);
		if (!isNaN(n) && n > 0) {
			return Math.max(n, 1);
		}
	}

	return 1;
}
