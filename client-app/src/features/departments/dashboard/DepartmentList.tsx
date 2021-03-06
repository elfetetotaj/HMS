import { observer } from 'mobx-react-lite';
import React from 'react';
import { useStore } from '../../../app/stores/store';
import DepartmentListItem from './DepartmentListItem';

export default observer(function DepartmentList() {

    const {departmentStore} = useStore();
    const {departmentsByName} = departmentStore

    return ( //video 5.7
        <>
            {departmentsByName.map(department => (
                <DepartmentListItem key={department.id} department={department} />
            ))}
        </>
    )
})