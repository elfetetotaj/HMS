import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import MedicineListItem from './MedicineListItem';

export default observer(function MedicineList() {

    const {medicineStore} = useStore();
    const {medicinesByName} = medicineStore

    return ( //video 5.7
        <>
            {medicinesByName.map(medicine => (
                <MedicineListItem key={medicine.id} medicine={medicine} />
            ))}
        </>
    )
})