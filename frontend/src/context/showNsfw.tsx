'use client';
import {createContext, useContext, useState} from 'react';

type NsfwContextType = [
	boolean,
	() => void,
];

const NsfwContext = createContext<NsfwContextType>([
	false,
	() => {
		// Do nothing
	},
]);

function NsfwContextProvider({children}: React.PropsWithChildren): JSX.Element {
	const defaultValue = localStorage.getItem('showNSFW');
	const parsed = defaultValue ? JSON.parse(defaultValue) as boolean : false;

	const [nsfw, setNsfw] = useState(parsed);

	const toggleNsfw = () => {
		setNsfw(!nsfw);
		localStorage.setItem('showNSFW', JSON.stringify(!nsfw));
	};

	return (
		<NsfwContext.Provider value={[nsfw, toggleNsfw]}>
			{children}
		</NsfwContext.Provider>
	);
}

const useShowNsfw = (): NsfwContextType => {
	const context = useContext(NsfwContext);
	if (context === undefined) {
		throw new Error('useNsfw must be used within a NsfwContextProvider');
	}

	return context;
};

export {useShowNsfw, NsfwContext, NsfwContextProvider};
