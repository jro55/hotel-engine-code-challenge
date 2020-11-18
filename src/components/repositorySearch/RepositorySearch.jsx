import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

import SearchBar from '../common/SearchBar';
import RepositoryListView from './RepositoryListView';
import ProgressSpinner from '../common/ProgressSpinner';
import { makeRequest } from '../../services/APIService';
import { useRepository } from '../../data/RepositoryContext';

/**
 * This is the default search page for the application
 */
export default function RepositorySearch() {
	const classes = useStyles();

	// respository state
	const { state, dispatch } = useRepository();

	// local state
	const [busy, setBusy] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const [activeFilter, setActiveFilter] = useState('any');
	const [sortBy, setSortBy] = useState('best match');

	return (
		<>
			<ProgressSpinner visible={busy} />
			<div className={classes.title}>Search de GitHub!!!!</div>
			<SearchBar
				placeholder="Search GitHub"
				value={searchTerm}
				handleInputOnChange={(term) => setSearchTerm(term)}
				handleSearch={() => handleSearch()}
				searchIcon
				filterOptions={{
					label: 'Language',
					options: [
						{ id: 'any', display: 'Any' },
						{ id: 'javascript', display: 'JavaScript' },
						{ id: 'typescript', display: 'TypeScript' },
						{ id: 'java', display: 'Java' },
						{ id: 'python', display: 'Python' },
						{ id: 'ruby', display: 'Ruby' },
					],
					handleChange: (option) => setActiveFilter(option),
					activeFilter,
				}}
				sortOptions={{
					options: [
						{ id: 'best match', display: 'Best match' },
						{ id: 'stars', display: 'Stars' },
					],
					handleChange: (option) => setSortBy(option),
					sortBy,
				}}
				disabled={busy}
				clearAll={clearAll}
			/>
			{!state.didPerformSearch && !state.repositorySearchResults.items ? (
				<DefaultText
					handlePopularSearchTermOnClick={(popularSearchTerm) =>
						handleSearch(popularSearchTerm)
					}
				/>
			) : (
				<RepositoryListView
					results={state.repositorySearchResults.items || []}
					totalCount={state.repositorySearchResults.total_count}
					didPerformSearch={state.didPerformSearch}
				/>
			)}
		</>
	);

	/**
	 * Searches GitHub's repositories API
	 * @param {string=} popularSearchTerm - predefined search term
	 */
	async function handleSearch(popularSearchTerm) {
		try {
			setBusy(true);
			const params = { sort: sortBy };
			if (popularSearchTerm) {
				setSearchTerm(popularSearchTerm);
				params.q = `${popularSearchTerm}+`;
			} else {
				params.q = `${searchTerm}+`;
			}
			if (activeFilter !== 'any') params.q += `language:${activeFilter}`;
			const results = await makeRequest(
				'get',
				'https://api.github.com/search/repositories',
				{},
				params
			);
			dispatch({ type: 'SET_REPOSITORY_SEARCH_RESULTS', results });
			setBusy(false);
		} catch (error) {
			// normally I would log something here for future debugging purposes
			console.error(error);
			// ideally the backend would have responded with a useful, human readable error that we could
			// display for the end user
			setBusy(false);
			alert(
				'An error occurred fetching results from GitHub, please try again.'
			);
		}
	}

	/**
	 * Sets all local and repository state back to defaults
	 */
	function clearAll() {
        if (busy) return;
		setSearchTerm('');
		setSortBy('best match');
		setActiveFilter('any');
		dispatch({ type: 'SET_REPOSITORY_SEARCH_RESULTS', results: {} });
	}
}

/**
 * Displays clickable popular search terms
 * @param {function} handlePopularSearchTermOnClick 
 */
function DefaultText(props) {
	const classes = useStyles();

	const { handlePopularSearchTermOnClick } = props;

	const popularSearches = [
		'JavaScript',
		'React',
		'React Native',
		'FireBase',
		'NodeJS',
		'ExpressJS',
		'TypeScript',
		'Redux',
		'GraphQL',
		'Apollo',
		'NestJS',
		'SQL',
		'PostgreSQL',
		'AWS',
		'Python',
		'Lodash',
		'Jest',
		'ESLint',
	];

	return (
		<div className={classes.defaultText__container}>
			<div className={classes.defaultText_title}>What is GitHub?</div>
			<div className={classes.defaultText_paragraph}>
				GitHub is a code hosting platform for version control and collaboration.
				It lets you and others work together on projects from anywhere.
				<br />
				<a
					href="https://www.howtogeek.com/180167/htg-explains-what-is-github-and-what-do-geeks-use-it-for/"
					target={'_blank'}
					rel="noreferrer"
				>
					Learn more about it here!
				</a>
			</div>
			<div className={classes.defaultText_title}>Popular searches by JRo</div>
			<div>
				{popularSearches.map((searchTerm) => (
					<Chip
						label={searchTerm}
						clickable
						className={classes.popularSearchChip}
						onClick={() => handlePopularSearchTermOnClick(searchTerm)}
					/>
				))}
			</div>
		</div>
	);
}

// This is a style convention that is straight from https://material-ui.com/
// I am not a big fan of it but I wanted to use their pattern for some parts of
// the app to save on time
const useStyles = makeStyles((theme) => ({
	title: {
		margin: 40,
		fontWeight: 'bold',
		fontSize: 20,
		textAlign: 'center',
	},
	defaultText__container: {
		marginTop: 20,
	},
	defaultText_title: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 40,
	},
	defaultText_paragraph: {
		fontSize: 14,
	},
	popularSearchChip: {
		marginTop: 10,
		marginRight: 15,
	},
}));
