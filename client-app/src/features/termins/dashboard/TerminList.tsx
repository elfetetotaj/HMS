import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import TerminListItem from './TerminListItem';

export default observer(function TerminList() {

    const {terminStore} = useStore();
    const {terminsByDate} = terminStore

    return ( //video 5.7
        <>
            {terminsByDate.map(termin => (
                <TerminListItem key={termin.id} termin={termin} />
            ))}
        </>
    )
})