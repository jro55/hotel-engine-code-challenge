import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

/**
 * Displays a search bar
 * @param {object} props 
 * @param {string} props.placeholder
 * @param {boolean} props.searchIcon
 * @param {function} props.handleSearch
 * @param {string} props.value
 * @param {function} props.handleInputOnChange
 * @param {object} props.filterOptions
 * @param {object} props.sortOptions
 * @param {boolean} props.disabled
 * @param {function} props.clearAll
 */
export default function SearchBar(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
			width: 400,
			position: 'relative',
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

	const classes = useStyles();

	const {
		placeholder,
		searchIcon,
		handleSearch,
		value,
		handleInputOnChange,
		filterOptions,
		sortOptions,
		disabled,
		clearAll,
	} = props;
	return (
		<FlexContainer>
			<SortBy sortOptions={sortOptions} disabled={disabled} />
			<FilterBy filterOptions={filterOptions} disabled={disabled} />
			<Paper className={classes.root}>
				<InputBase
					className={classes.input}
					placeholder={placeholder}
					inputProps={{ 'aria-label': 'search google maps' }}
					value={value}
					onChange={(e) => handleInputOnChange(e.target.value)}
					onKeyDown={(e) => {
						if (e.keyCode === 13) {
							// if enter key is pressed
							return handleSearch();
						}
					}}
					disabled={disabled}
				/>
				{searchIcon && (
					<IconButton
						onClick={handleSearch}
						className={classes.iconButton}
						aria-label="search"
						disabled={disabled}
					>
						<SearchIcon />
					</IconButton>
				)}
				{clearAll && <ClearAll clearAll={clearAll} />}
			</Paper>
		</FlexContainer>
	);
}

/**
 * Displays a FilterBy option
 * @param {object} props
 * @param {object} props.filterOptions
 * @param {booldea} props.disabled
 */
function FilterBy(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	}));

	const classes = useStyles();

	const { filterOptions, disabled } = props;

	const handleChange = (event) => {
		filterOptions.handleChange(event.target.value);
	};

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel id="demo-simple-select-outlined-label">
				{filterOptions.label}
			</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={filterOptions.activeFilter}
				onChange={handleChange}
				label={filterOptions.label}
				disabled={disabled}
			>
				{filterOptions.options.map((option) => (
					<MenuItem value={option.id} key={option.id}>
						{option.display}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

/**
 * Displays a SortBy option
 * @param {object} props
 * @param {object} props.sortOptions
 * @param {booldea} props.disabled
 */
function SortBy(props) {
	const useStyles = makeStyles((theme) => ({
		root: {
			padding: '2px 4px',
			display: 'flex',
			alignItems: 'center',
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
	}));

	const classes = useStyles();

	const { sortOptions, disabled } = props;

	const handleChange = (event) => {
		sortOptions.handleChange(event.target.value);
	};

	return (
		<FormControl variant="outlined" className={classes.formControl}>
			<InputLabel id="demo-simple-select-outlined-label">Sort By</InputLabel>
			<Select
				labelId="demo-simple-select-outlined-label"
				id="demo-simple-select-outlined"
				value={sortOptions.sortBy}
				onChange={handleChange}
				label={'Sort by'}
				disabled={disabled}
			>
				{sortOptions.options.map((option) => (
					<MenuItem value={option.id} key={option.id}>
						{option.display}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

/**
 * Displays a clear all clickable text
 * @param {function} clearAll 
 */
function ClearAll({ clearAll }) {
	return <ClearAllContainer onClick={clearAll}>Clear all</ClearAllContainer>;
}

const ClearAllContainer = styled.div`
	position: absolute;
	right: -70px;
	color: #57c1e9;
	font-weight: bold;
	cursor: pointer;
`;

export const FlexContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
`;
