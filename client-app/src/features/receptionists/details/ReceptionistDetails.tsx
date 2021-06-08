import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { Grid } from 'semantic-ui-react';
import ReceptionistDetailedChat from './ReceptionistDetailedChat';
import ReceptionistDetailedInfo from './ReceptionistDetailedInfo';
import ReceptionistDetailedSidebar from './ReceptionistDetailedSidebar';
import ReceptionistDetailedHeader from './ReceptionistDetailesHeader';



export default observer (function ReceptionistDetails() {

    const {receptionistStore} = useStore();
    const {selectedReceptionist: receptionist, loadReceptionist, loadingInitial} = receptionistStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadReceptionist(id);
    },[id, loadReceptionist]);

    if (loadingInitial || !receptionist ) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ReceptionistDetailedHeader receptionist={receptionist} />
                <ReceptionistDetailedInfo receptionist={receptionist} />
                <ReceptionistDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <ReceptionistDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
} )