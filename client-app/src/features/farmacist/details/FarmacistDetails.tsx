import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import FarmacistDetailedChat from './FarmacistDetailedChat';
import FarmacistDetailedHeader from './FarmacistDetailedHeader';
import FarmacistDetailedInfo from './FarmacistDetailedInfo';

export default observer(function FarmacistDetails() {
    const {farmacistStore} = useStore();
    const {selectedFarmacist: farmacist, loadFarmacist, loadingInitial} = farmacistStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadFarmacist(id);
    }, [id, loadFarmacist]);

    if (loadingInitial || !farmacist) return <LoadingComponent />;

    return (
        <Grid>
    
            <Grid.Column width={15}>
                
                <FarmacistDetailedHeader farmacist={farmacist} />
            
                <FarmacistDetailedInfo farmacist={farmacist} />
                {/* <FarmacistDetailedChat /> */}
            </Grid.Column>
            {/* <Grid.Column width={6}>
                <FarmacistDetailedSidebar />
            </Grid.Column> */}
        </Grid>
    )
})