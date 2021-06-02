import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props {
    patientinfo: Patient[];
    selectPatient: (id: string) => void;
    deletePatient: (id: string) => void;
}

export default function PatientList({patientinfo, selectPatient, deletePatient}: Props) {
    return ( 
        <Segment>
            <Item.Group divided>
                {patientinfo.map(patient => (
                    <Item key={patient.id}>
                        <Item.Content> 
                            <Item.Header as='a'>{patient.p_fname}, {patient.p_lname}, {patient.p_gender}</Item.Header>
                            <Item.Meta>{patient.dob}</Item.Meta>
                            <Item.Description>
                                <div>{patient.p_street_address}, {patient.p_postal_code}</div>
                                <div>{patient.p_city}, {patient.p_country} , {patient.p_weight}</div>
                                <div>{patient.p_phone}, {patient.other_det}, {patient.p_rdate}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectPatient(patient.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deletePatient(patient.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}