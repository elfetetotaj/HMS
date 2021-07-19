import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentDetailedChat from './DepartmentDetailedChat';
import MedicineDetailedHeader from './MedicineDetailedHeader';
import MedicineDetailedInfo from './MedicineDetailedInfo';
import MedicineDetailedSidebar from './MedicineDetailedSidebar';

export default observer(function MedicineDetails() {
    const {medicineStore} = useStore();
    const {selectedMedicine: medicine, loadMedicine, loadingInitial, clearSelectedMedicine} = medicineStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadMedicine(id);
        return () => clearSelectedMedicine();
    }, [id, loadMedicine, clearSelectedMedicine]);

    if (loadingInitial || !medicine) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <MedicineDetailedHeader medicine={medicine} />
                <MedicineDetailedInfo medicine={medicine} />
                {/* <DepartmentDetailedChat departmentId={department.id}/> */}
            </Grid.Column>
            {/* <Grid.Column width={6}>
                <DepartmentDetailedSidebar department={department} />
            </Grid.Column> */}
        </Grid>
    )
})