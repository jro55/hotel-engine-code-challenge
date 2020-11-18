import React, { createContext, useContext } from 'react';

const SET_REPOSITORY_SEARCH_RESULTS = 'SET_REPOSITORY_SEARCH_RESULTS';
const SET_ACTIVE_REPOSITORY = 'SET_ACTIVE_REPOSITORY';

const RepositoryContext = createContext();

export function useRepository() {
	const context = useContext(RepositoryContext);
	if (!context) {
		throw new Error(`useRepository must be used within a CountProvider`);
	}

	const [state, dispatch] = context;
	const setRepositories = (results) =>
		dispatch({ type: SET_REPOSITORY_SEARCH_RESULTS, results });
	const setActiveRepository = (repository) =>
		dispatch({ type: SET_ACTIVE_REPOSITORY, repository });
	return {
		state,
		dispatch,
		setRepositories,
		setActiveRepository,
	};
}

export function repositoryReducer(state, action) {
	switch (action.type) {
		case SET_REPOSITORY_SEARCH_RESULTS: {
			const isEmpty = Object.keys(action.results).length === 0;
			return {
				...state,
				repositorySearchResults: action.results,
				didPerformSearch: isEmpty ? false : true,
			};
		}
		case SET_ACTIVE_REPOSITORY: {
			return {
				...state,
				repository: action.repository,
			};
		}
		default: {
			throw new Error(`Unsupported action type: ${action.type}`);
		}
	}
}

export function RepositoryProvider(props) {
	const [state, dispatch] = React.useReducer(repositoryReducer, initialState);
	const value = React.useMemo(() => [state, dispatch], [state]);
	return <RepositoryContext.Provider value={value} {...props} />;
}

const initialState = {
	repositorySearchResults: {},
	repository: {},
	didPerformSearch: false,
};
