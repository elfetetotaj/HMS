import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import SurgeryDetailedChat from './SurgeryDetailedChat';
import SurgeryDetailedHeader from './SurgeryDetailedHeader';
import SurgeryDetailedInfo from './SurgeryDetailedInfo';
import SurgeryDetailedSidebar from './SurgeryDetailedSidebar';

export default observer(function SurgeryDetails() {
    const {surgeryStore} = useStore();
    const {selectedSurgery: surgery, loadSurgery, loadingInitial} = surgeryStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadSurgery(id);
    }, [id, loadSurgery]);

    if (loadingInitial || !surgery) return <LoadingComponent />;

    return (
        <Grid>
    
            <Grid.Column width={10}>
                
                <SurgeryDetailedHeader surgery={surgery} />
            
                <SurgeryDetailedInfo surgery={surgery} />
                <SurgeryDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <SurgeryDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})