import React from 'react';
import styled from 'styled-components';
import { useNavigate } from '@reach/router';

import { useRepository } from '../../data/RepositoryContext';
import RepositoryCard from './RepositoryCard';
import WhereGif from '../../tenor.gif';

function RepositoryListView(props) {
	const { results, totalCount } = props;
	const { dispatch } = useRepository();
	const navigate = useNavigate();

	if (!results.length) {
		return (
			<Container>
				<NoResultsContainer>
					<NoResultsText>
						Oh no, it looks like your search results came back with nothing!
						<br />
						Please change your search and try again.
					</NoResultsText>
					<img src={WhereGif} alt="loading..." />
				</NoResultsContainer>
			</Container>
		);
	}
	return (
		<>
			<div inputProps={{ 'data-testid': 'total-count' }}>{totalCount} total results</div>
			<FlexContainer>
				{results.map((repository) => {
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
								dispatch({ type: 'SET_ACTIVE_REPOSITORY', repository });
								navigate('/details');
							}}
						/>
					);
				})}
			</FlexContainer>
		</>
	);
}

// Use React.memo to prevent unnecessary re-renders
export default React.memo(RepositoryListView);

// Below I used styled components to make easily readable, styled components. Just another way to styling.
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

const NoResultsContainer = styled.div`
	text-align: center;
`;

const NoResultsText = styled.div`
	font-size: 18px;
	margin-top: 40px;
	margin-bottom: 40px;
`;
