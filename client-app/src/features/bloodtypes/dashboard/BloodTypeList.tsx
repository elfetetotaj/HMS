import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import BloodTypeListItem from './BloodTypeListItem';

export default observer(function BloodTypeList() {

    const {bloodTypeStore} = useStore();
    const {bloodByType} = bloodTypeStore

    return ( //video 5.7
        <>
            {bloodByType.map(bloodByType => (
                <BloodTypeListItem key={bloodByType.type} bloodType={bloodByType} />
            ))}
        </>
    )
})