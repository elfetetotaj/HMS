import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import FarmacistListItem from './FarmacistListItem';

export default observer(function FarmacistList() {

    const {farmacistStore} = useStore();
    const {farmacistsByDate} = farmacistStore

    return ( //video 5.7
        <>
            {farmacistsByDate.map(farmacist => (
                <FarmacistListItem key={farmacist.id} farmacist={farmacist} />
            ))}
        </>
    )
})