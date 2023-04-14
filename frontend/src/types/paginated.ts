export type Paginated<T> = {
	data: T[];
	meta: {
		itemsCount: number;
		pageSize: number;
		page: number;
	};
};
