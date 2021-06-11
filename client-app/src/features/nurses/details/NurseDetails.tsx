import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import NurseDetailedChat from './NurseDetailedChat';
import NurseDetailedHeader from './NurseDetailedHeader';
import NurseDetailedInfo from './NurseDetailedInfo';
import NurseDetailedSidebar from './NurseDetailedSidebar';

export default observer(function NurseDetails() {
    const {nurseStore} = useStore();
    const {selectedNurse: nurse, loadNurse, loadingInitial} = nurseStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadNurse(id);
    }, [id, loadNurse]);

    if (loadingInitial || !nurse) return <LoadingComponent />;

    return (
        <Grid>
    
            <Grid.Column width={10}>
                
                <NurseDetailedHeader nurse={nurse} />
                {/* <DepartmentDetailedInfo department={department} /> ----------Use it when u add department.description--------*/}
                <NurseDetailedInfo />
                <NurseDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <NurseDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})