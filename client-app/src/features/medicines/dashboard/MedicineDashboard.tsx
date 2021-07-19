import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import MedicineFilters from './MedicineFilters';
import MedicineList from './MedicineList';

export default observer(function MedicineDashboard() {

    const {medicineStore} = useStore();
    const {loadMedicines, medicineRegistry} = medicineStore;

    useEffect(() => {
        if (medicineRegistry.size <= 1) loadMedicines();
    }, [medicineRegistry.size, loadMedicines])

    if (medicineStore.loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <MedicineList />
            </Grid.Column>
            <Grid.Column width='6'>
                <MedicineFilters />
            </Grid.Column>
        </Grid>
    )
})