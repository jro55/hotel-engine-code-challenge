import React from 'react';

import { useRepository } from '../../data/RepositoryContext';

export default function RepositoryDetails(props) {
    const { state } = useRepository();
    console.log('state', state)
    return (
        <div>Repository details here</div>
    )
}