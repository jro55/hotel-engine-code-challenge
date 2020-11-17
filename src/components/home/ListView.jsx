import React from 'react';
import styled from 'styled-components'

import MediaCard from './Card';

export default function ListView(props) {
    const { results } = props;

    if (!results.length) {
        return (
            <div>
                Try seraching above!
            </div>
        )
    }
    console.log(results[0])
    return (
        <FlexContainer>
            {
                results.map((result) => {
                    return (
                        <MediaCard
                            imageUrl={result.owner.avatar_url}
                            title={result.name}
                            description={result.description}
                    />
                    )
                })
            }
        </FlexContainer>
    )
}

export const FlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
`;