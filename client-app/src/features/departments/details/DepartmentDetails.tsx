import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentDetailedChat from './DepartmentDetailedChat';
import DepartmentDetailedHeader from './DepartmentDetailedHeader';
import DepartmentDetailedInfo from './DepartmentDetailedInfo';
import DepartmentDetailedSidebar from './DepartmentDetailedSidebar';

export default observer(function DepartmentDetails() {
    const {departmentStore} = useStore();
    const {selectedDepartment: department, loadDepartment, loadingInitial, clearSelectedDepartment} = departmentStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadDepartment(id);
        return () => clearSelectedDepartment();
    }, [id, loadDepartment, clearSelectedDepartment]);

    if (loadingInitial || !department) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <DepartmentDetailedHeader department={department} />
                <DepartmentDetailedInfo department={department} />
                <DepartmentDetailedChat departmentId={department.id}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <DepartmentDetailedSidebar department={department} />
            </Grid.Column>
        </Grid>
    )
})