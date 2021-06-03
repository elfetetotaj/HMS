import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';
import PatientDetails from '../details/PatientDetails';
import PatientForm from '../form/PatientForm';
import PatientList from './PatientList';

interface Props {
    patientinfo: Patient[];
    selectedPatient: Patient | undefined;
    selectPatient: (id: string) => void;
    cancelSelectPatient: () => void;
    editModePatient: boolean;
    openFormPatient: (id: string) => void;
    closeForm: () => void;
    createOrEdit: (patient: Patient) => void;
    deletePatient: (id: string) => void;
}

export default function PatientDashboard({patientinfo, selectedPatient, selectPatient, cancelSelectPatient, editModePatient, openFormPatient, closeForm, createOrEdit, deletePatient}: Props) {
    return (
        <Grid>
            <Grid.Column width='10'>
                <PatientList 
                    patientinfo={patientinfo} 
                    selectPatient={selectPatient} 
                    deletePatient={deletePatient}
                />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedPatient && !editModePatient &&
                <PatientDetails 
                    patient={selectedPatient} 
                    cancelSelectPatient={cancelSelectPatient} 
                    openFormPatient={openFormPatient}
                />}
                {editModePatient &&
                <PatientForm closeForm={closeForm} patient={selectedPatient} createOrEdit={createOrEdit} />}
            </Grid.Column>
        </Grid>
    )
}