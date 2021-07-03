import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import DepartmentDetailedChat from './DepartmentDetailedChat';
import TerminDetailedHeader from './TerminDetailedHeader';
import TerminDetailedInfo from './TerminDetailedInfo';
import TerminDetailedSidebar from './TerminDetailedSidebar';

export default observer(function TerminDetails() {
    const {terminStore} = useStore();
    const {selectedTermin: termin, loadTermin, loadingInitial, clearSelectedTermin} = terminStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadTermin(id);
        return () => clearSelectedTermin();
    }, [id, loadTermin, clearSelectedTermin]);

    if (loadingInitial || !termin) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={16}>
                <TerminDetailedHeader termin={termin} />
                <TerminDetailedInfo termin={termin} />
                {/* <DepartmentDetailedChat departmentId={department.id}/> */}
            </Grid.Column>
            {/* <Grid.Column width={6}>
                <DepartmentDetailedSidebar department={department} />
            </Grid.Column> */}
        </Grid>
    )
})