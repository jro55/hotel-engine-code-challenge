import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from '../common/SearchBar';
import RepositoryListView from './RepositoryListView';
import ProgressSpinner from '../common/ProgressSpinner';
import { makeRequest } from '../../services/APIService';
import { useRepository } from '../../data/RepositoryContext';

export default function Home() {
    const classes = useStyles();

    const { state, dispatch } = useRepository();
    console.log('state', state)

    // const searchResults = state.repositorySearchResults?.
    const [busy, setBusy] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    // const [searchResults, setSearchResults] = useState(state.repositorySearchResults);
    const [activeFilter, setActiveFilter] = useState('any');
    const [sortBy, setSortBy] = useState('best match');

    return (
        <>
            <ProgressSpinner visible={busy} />
            <div className={classes.title}>
                Search de GitHub!!!!
            </div>
            <SearchBar
                placeholder='Search GitHub'
                value={searchTerm}
                handleInputOnChange={term => setSearchTerm(term)}
                handleSearch={handleSearch}
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
                    handleChange: option => setActiveFilter(option),
                    activeFilter,
                }}
                sortOptions={{
                    options: [
                        { id: 'best match', display: 'Best match' },
                        { id: 'stars', display: 'Stars' },
                    ],
                    handleChange: option => setSortBy(option),
                    sortBy,
                }}
                disabled={busy}
            />
            <RepositoryListView
                results={state.repositorySearchResults.items || []}
                totalCount={state.repositorySearchResults.total_count}
            />
        </>
    )

    async function handleSearch() {
        try {
            setBusy(true);
            const params = {
                q: `${searchTerm}+`,
                sort: sortBy,
            }
            if (activeFilter !== 'any') params.q += `language:${activeFilter}`;
            const results = await makeRequest('get', 'https://api.github.com/search/repositories', {}, params);
            console.log('results', results)
            dispatch({ type: 'SET_REPOSITORY_SEARCH_RESULTS', results })
            setBusy(false);
        } catch (error) {
            // normally I would log something here for future debugging purposes
            console.error(error)
            // ideally the backend would have responded with a useful, human readable error that we could 
            // display for the end user
            setBusy(false);
            alert('An error occurred fetching results from GitHub, please try again.')
        }
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: 400,
    },
    title: {
        margin: 40,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
  }));