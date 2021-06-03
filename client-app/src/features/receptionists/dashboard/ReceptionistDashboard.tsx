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
    editModeReceptionist: boolean;
    openFormReceptionist: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (receptionist: Receptionist) => void;
    deleteReceptionist: (id: string) => void;
}

export default function ReceptionistDashboard({receptionists, selectedReceptionist, deleteReceptionist,
        selectReceptionist, cancelSelectReceptionist, editModeReceptionist, openFormReceptionist, closeForm, createOrEdit}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <ReceptionistList receptionists={receptionists} 
                    selectReceptionist={selectReceptionist} 
                    deleteReceptionist={deleteReceptionist}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedReceptionist && !editModeReceptionist &&
                <ReceptionistDetails 
                    receptionist={selectedReceptionist} 
                    cancelSelectReceptionist={cancelSelectReceptionist}
                    openFormReceptionist={openFormReceptionist} 
                />}
                {editModeReceptionist &&
                <ReceptionistForm closeForm={closeForm} receptionist={selectedReceptionist} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
} 