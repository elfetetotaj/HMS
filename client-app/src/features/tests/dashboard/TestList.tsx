import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import TestListItem from './TestListItem';

export default observer(function TestList() {

    const {testStore} = useStore();
    const {testsByName} = testStore

    return ( //video 5.7
        <>
            {testsByName.map(test => (
                <TestListItem key={test.id} test={test} />
            ))}
        </>
    )
})