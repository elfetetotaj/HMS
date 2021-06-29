import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import SurgeryListItem from './SurgeryListItem';

export default observer(function SurgeryList() {

    const {surgeryStore} = useStore();
    const {surgeriesByDate} = surgeryStore

    return ( //video 5.7
        <>
            {surgeriesByDate.map(surgery => (
                <SurgeryListItem key={surgery.Id} surgery={surgery} />
            ))}
        </>
    )
})