import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import TechEmployeeListItem from './TechEmployeeListItem';

export default observer(function TechEmployeeList() {

    const {techEmployeeStore} = useStore();
    const {techEmployeesByDate} = techEmployeeStore

    return ( //video 5.7
        <>
            {techEmployeesByDate.map(techEmployee => (
                <TechEmployeeListItem key={techEmployee.id} techEmployee={techEmployee} />
            ))}
        </>
    )
})