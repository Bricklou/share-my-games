'use client';
import {createContext, useContext, useState} from 'react';

type NsfwContextType = [boolean, () => void];

const NsfwContext = createContext<NsfwContextType>([
	false,
	() => {
		// Do nothing
	},
]);

function NsfwContextProvider({children}: React.PropsWithChildren): JSX.Element {
	// The globalThis is used to make sure that the code works in both the browser and the server
	// Since the server can't work with localStorage, we need to check if it exists
	const defaultValue = globalThis.localStorage ? localStorage.getItem('showNSFW') : null;
	const parsed = defaultValue ? (JSON.parse(defaultValue) as boolean) : false;

	const [nsfw, setNsfw] = useState(parsed);

	const toggleNsfw = () => {
		setNsfw(!nsfw);
		localStorage.setItem('showNSFW', JSON.stringify(!nsfw));
	};

	return <NsfwContext.Provider value={[nsfw, toggleNsfw]}>{children}</NsfwContext.Provider>;
}

const useShowNsfw = (): NsfwContextType => {
	const context = useContext(NsfwContext);
	if (context === undefined) {
		throw new Error('useNsfw must be used within a NsfwContextProvider');
	}

	return context;
};

export {useShowNsfw, NsfwContext, NsfwContextProvider};
