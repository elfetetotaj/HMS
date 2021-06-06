import { observer } from 'mobx-react-lite';
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import ReceptionistDetails from '../details/ReceptionistDetails';
import ReceptionistForm from '../form/ReceptionistForm';
import ReceptionistList from './ReceptionistList';

export default observer(function ReceptionistDashboard() {
    
    const {receptionistStore} = useStore();
    const{selectedReceptionist, editMode} = receptionistStore;


    return (
        <Grid>
            <Grid.Column width='10'>
                <ReceptionistList/>
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedReceptionist && !editMode &&
                <ReceptionistDetails/>}
                {editMode &&
                <ReceptionistForm/>}
            </Grid.Column>
        </Grid>
    )
}) 