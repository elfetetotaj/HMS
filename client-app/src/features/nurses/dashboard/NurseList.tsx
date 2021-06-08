import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import NurseListItem from './NurseListItem';

export default observer(function NurseList() {

    const {nurseStore} = useStore();
    const {nursesByDate} = nurseStore

    return ( //video 5.7
        <>
            {nursesByDate.map(nurse => (
                <NurseListItem key={nurse.id} nurse={nurse} />
            ))}
        </>
    )
})