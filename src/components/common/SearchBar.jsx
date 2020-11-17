import React from 'react';
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

export default function SearchBar(props) {
    const classes = useStyles();

    const {
        placeholder,
        searchIcon,
        handleSearch,
        value,
        handleInputOnChange,
    } = props;
    return (
        <Paper className={classes.root}>
            <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search google maps' }}
                value={value}
                onChange={e => handleInputOnChange(e.target.value)}
                onKeyDown={(e) => {
                    if(e.keyCode == 13) { // if enter key is pressed
                        return handleSearch();
                     }
                }}
            />
            {
                searchIcon && (
                    <IconButton onClick={handleSearch} className={classes.iconButton} aria-label="search">
                        <SearchIcon />
                    </IconButton>
                )
            }
        </Paper>
    )
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
