import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import styled from 'styled-components'
import Box from '@material-ui/core/Box';

import { Container } from '../common/Layout'
import SearchBar from '../common/SearchBar';
import ListView from './ListView';
import { makeRequest } from '../../services/APIService'

export default function Home() {
    const classes = useStyles();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState({});
    const [activeFilter, setActiveFilter] = useState('any');
    const [sortBy, setSortBy] = useState('best match');

    return (
        <div>
            <div>
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
            <ListView
                results={searchResults.items || []}
            />
        </div>
    )

    async function handleSearch() {
        try {
            const params = {
                q: `${searchTerm}+`,
                sort: sortBy,
            }
            if (activeFilter !== 'any') params.q += `language:${activeFilter}`;

            console.log('params', params)
            const results = await makeRequest('get', 'https://api.github.com/search/repositories', {}, params)
            console.log('results', results)
            setSearchResults(results);
        } catch (error) {
            console.error('error here')
            // Normally I would log something here for future debugging purposes
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
  }));