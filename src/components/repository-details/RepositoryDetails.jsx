import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import GitHubIcon from '@material-ui/icons/GitHub';

import { useRepository } from '../../data/RepositoryContext';

export default function RepositoryDetails(props) {
    const classes = useStyles();

    const { state } = useRepository();
    const repository = state.repository;
    console.log('repository', repository)

    if (Object.keys(repository).length === 0) {
        return (
            <div>
                Refreshing the page while on details removes the repository from state thus rendering an empty page.
                <br/>
                This could be fixed several ways including using local cache.
            </div>
        )
    }

    return (
        <Paper className={classes.root}>
            <div className={classes.title}>
                <div className={classes.title__item}>
                    <StarIcon style={{ color: 'gold' }} />
                    <span className={classes.title__item__left__text}>{repository.watchers}</span>
                </div>
                <div className={classes.title__item}>
                    <GitHubIcon style={{ fontSize: '2em' }} />
                    <span className={classes.title__item__center__text}>Repository</span>
                </div>
                <div className={classes.title__item}>
                    <span className={classes.title__item__right__text}>{repository.language}</span>
                </div>
            </div>
            <div className={classes.body}>
                <div className={classes.body__header}>
                    Description:
                </div>
                <div className={classes.body__field}>
                    {repository.description}
                </div>
                <div className={classes.body__header}>
                    Created:
                </div>
                <div className={classes.body__field}>
                    {repository.created_at}
                </div>
                <div className={classes.body__header}>
                    Home page:
                </div>
                <div className={classes.body__field}>
                    <a href={repository.homepage} target={'_blank'} rel="noreferrer">{repository.homepage || 'N/A'}</a>
                </div>
                <div className={classes.body__header}>
                    Archived:
                </div>
                <div className={classes.body__field}>
                    {repository.archived.toString()}
                </div>
            </div>
        </Paper>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        marginTop: 40,
        flexDirection: 'column',
    },
    title: {
        height: 100,
        display: 'flex',
        padding: 20,
        backgroundColor: '#FAFBFC',
        width: '100%',
        flexDirection: 'row',
        borderBottom: '1px solid #EAECEF',
        justifyContent: 'space-between',
    },
    title__link: {
        color: '#0366D6',
        fontSize: 18,
        marginTop: 15,
    },
    title__right: {
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'right',
    },
    title__item: {
        display: 'flex',
        alignItems: 'center',
    },
    title__item__left__text: {
        marginBottom: -1,
        paddingLeft: 5,
        fontSize: 18,
    },
    title__item__center__text: {
        paddingLeft: 5,
        fontSize: 18,
    },
    title__item__right__text: {
        fontSize: 18,
    },
    body: {
        padding: 20,
    },
    body__header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 10,
    },
    body__field: {
        fontSize: 14,
    }
  }));