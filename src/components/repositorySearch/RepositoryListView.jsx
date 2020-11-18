import React from 'react';
import styled from 'styled-components'
import { useNavigate } from "@reach/router"

import { useRepository } from '../../data/RepositoryContext';
import RepositoryCard from './RepositoryCard';
import WhereGif from '../../tenor.gif';

function RepositoryListView(props) {
    const { results, totalCount, didPerformSearch } = props;
    console.log('render')
    const { dispatch } = useRepository();
    const navigate = useNavigate()

    if (didPerformSearch && !results.length) {
        return (
            <Container>
                <NoResultsContainer>
                    <NoResultsText>
                        Oh no, it looks like your search results came back with nothing!
                        <br/>Please change your search and try again.
                    </NoResultsText>
                    <img src={WhereGif} alt="loading..."/>
                </NoResultsContainer>
            </Container>
        )
    }
    if (!results.length) {
        return (
            <Container>
                <Title>What is GitHub?</Title>
                <Paragraph>
                    GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere.
                </Paragraph>
            </Container>
        )
    }
    return (
        <>
            <TotalCount >{totalCount} total results</TotalCount>
            <FlexContainer>
                {
                    results.map((repository) => {
                        return (
                            <RepositoryCard
                                key={repository.id}
                                imageUrl={repository.owner.avatar_url}
                                title={repository.name}
                                description={repository.description}
                                stars={repository.watchers}
                                language={repository.language}
                                owner={repository.owner.login}
                                onClick={() => {
                                    dispatch({ type: 'SET_ACTIVE_REPOSITORY', repository })
                                    navigate('/details')
                                }}
                        />
                        )
                    })
                }
            </FlexContainer>
        </>
    )
}

export default React.memo(RepositoryListView)

const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;

const Container = styled.div`
    margin-top: 20px;
`;

const TotalCount = styled.div`
    margin-left: 15px;
    margin-top: 20px;
`;

const Title = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const Paragraph = styled.p`
    font-size: 14px;
`;

const NoResultsContainer = styled.div`
    text-align: center;
`

const NoResultsText = styled.div`
    font-size: 18px;
    margin-top: 40px;
    margin-bottom: 40px;
`