import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import TherapyListItem from './TherapyListItem';

export default observer(function TherapyList() {

    const {therapyStore} = useStore();
    const {therapiesByDate} = therapyStore

    return ( 
        <>
            {therapiesByDate.map(therapy => (
                <TherapyListItem key={therapy.id} therapy={therapy} />
            ))}
        </>
    )
})