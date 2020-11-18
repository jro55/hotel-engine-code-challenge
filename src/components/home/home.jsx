import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import SearchBar from '../common/SearchBar';
import RepositoryListView from './RepositoryListView';
import ProgressSpinner from '../common/ProgressSpinner';
import { makeRequest } from '../../services/APIService';

export default function Home() {
    const classes = useStyles();

    const [busy, setBusy] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [activeFilter, setActiveFilter] = useState('any');
    const [sortBy, setSortBy] = useState('best match');

    return (
        <div>
            <ProgressSpinner visible={busy} />
            <div className={classes.titleBar}>
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
                        { id: 'java', display: 'Java' },
                        { id: 'python', display: 'Python' },
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
            />
            <RepositoryListView
                results={searchResults.items || []}
            />
        </div>
    )

    async function handleSearch() {
        try {
            setBusy(true);
            const params = {
                q: `${searchTerm}+`,
                sort: sortBy,
            }
            if (activeFilter !== 'any') params.q += `language:${activeFilter}`;
            
            const results = await makeRequest('get', 'https://api.github.com/search/repositories', {}, params)
            console.log('results', results)
            setSearchResults(results);
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
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
    titleBar: {
        margin: 40,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    }
  }));