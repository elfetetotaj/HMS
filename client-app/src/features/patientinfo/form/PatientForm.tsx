import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props {
    patient: Patient | undefined;
    closeForm: () => void;
    createOrEdit: (patient: Patient) => void;
}

export default function PatientForm({patient: selectedPatient, closeForm, createOrEdit}: Props) {

const initialState = selectedPatient ?? {
    id: '',
    p_fname: '',
    p_lname: '',
    dob: '',
    p_gender: '',
    p_street_address: '',
    p_city: '',
    p_country: '',
    p_postal_code: '',
    p_phone: '',
    p_weight: '',
    other_det: '',
    p_rdate: ''
}

const [patient, setPatient] = useState(initialState);

function handleSubmit() {
    createOrEdit(patient);
}

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setPatient({...patient, [name]: value})
}

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={patient.p_fname} name='p_fname' onChange={handleInputChange} />
                <Form.Input placeholder='Last Name' value={patient.p_lname} name='p_lname' onChange={handleInputChange} />
                <Form.Input placeholder='Birthday' value={patient.dob} name='dob' onChange={handleInputChange} />
                <Form.Input placeholder='Gender' value={patient.p_gender} name='p_gender' onChange={handleInputChange} />
                <Form.Input placeholder='Street Address' value={patient.p_street_address} name='p_street_address' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={patient.p_city} name='p_city' onChange={handleInputChange} />
                <Form.Input placeholder='Country' value={patient.p_country} name='p_country' onChange={handleInputChange} />
                <Form.Input placeholder='Postal Code' value={patient.p_postal_code} name='p_postal_code' onChange={handleInputChange} />
                <Form.Input placeholder='Phone' value={patient.p_phone} name='p_phone' onChange={handleInputChange} />
                <Form.Input placeholder='Weight' value={patient.p_weight} name='p_weight' onChange={handleInputChange} />
                <Form.Input placeholder='Sickness' value={patient.other_det} name='other_det' onChange={handleInputChange} />
                <Form.Input placeholder='Some random date' value={patient.p_rdate} name='p_rdate' onChange={handleInputChange} />
                <Button floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}