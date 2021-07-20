import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import SurgeryListItem from './SurgeryListItem';

export default observer(function SurgeryList() {

    const {surgeryStore} = useStore();
    const {surgeriesByDate} = surgeryStore

    return (
        <>
            {surgeriesByDate.map(surgery => (
                <SurgeryListItem key={surgery.id} surgery={surgery} />
            ))}
        </>
    )
})