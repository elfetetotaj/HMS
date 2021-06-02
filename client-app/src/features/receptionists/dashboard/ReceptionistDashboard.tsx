import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Receptionist } from '../../../app/models/receptionist';
import ReceptionistDetails from '../details/ReceptionistDetails';
import ReceptionistForm from '../form/ReceptionistForm';
import ReceptionistList from './ReceptionistList';

interface Props {
    receptionists: Receptionist[];
    selectedReceptionist: Receptionist | undefined;
    selectReceptionist: (id: string) => void;
    cancelSelectReceptionist: () => void;
    editMode: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (receptionist: Receptionist) => void;
    deleteReceptionist: (id: string) => void;
}

export default function ReceptionistDashboard({receptionists, selectedReceptionist, deleteReceptionist,
        selectReceptionist, cancelSelectReceptionist, editMode, openForm, closeForm, createOrEdit}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ReceptionistList receptionists={receptionists} 
                    selectReceptionist={selectReceptionist} 
                    deleteReceptionist={deleteReceptionist}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedReceptionist && !editMode &&
                <ReceptionistDetails 
                    receptionist={selectedReceptionist} 
                    cancelSelectReceptionist={cancelSelectReceptionist}
                    openForm={openForm} 
                />}
                {editMode &&
                <ReceptionistForm closeForm={closeForm} receptionist={selectedReceptionist} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
} 