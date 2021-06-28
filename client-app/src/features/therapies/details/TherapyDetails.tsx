import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import TherapyDetailedChat from './TherapyDetailedChat';
import TherapyDetailedHeader from './TherapyDetailedHeader';
import TherapyDetailedInfo from './TherapyDetailedInfo';
import TherapyDetailedSidebar from './TherapyDetailedSidebar';

export default observer(function TherapyDetails() {
    const {therapyStore} = useStore();
    const {selectedTherapy: therapy, loadTherapy, loadingInitial} = therapyStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadTherapy(id);
    }, [id, loadTherapy]);

    if (loadingInitial || !therapy) return <LoadingComponent />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <TherapyDetailedHeader therapy={therapy} />
                <TherapyDetailedInfo therapy={therapy} />
                <TherapyDetailedChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <TherapyDetailedSidebar />
            </Grid.Column>
        </Grid>
    )
})