import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer(function PatientForm(){
    const history = useHistory();
    const {patientStore} = useStore();
    const {createPatient, updatePatient, 
            loading, loadPatient, loadingInitial} = patientStore;
    const {id} = useParams<{id: string}>();

    const [patient, setPatient] =useState({
        id: '',
        name: '',
        surname: '',
        dateofbirth: '',
        gender: '',
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        phone: '',
        weight: '',
        other_det: '',
        register_date: '',
    });

    useEffect(() => {
        if (id) loadPatient(id).then(patient => setPatient(patient!))
    }, [id, loadPatient]);

    function handleSubmit(){
       if (patient.id.length === 0 ) {
           let newPatient ={
               ...patient,
               id:uuid()
           };
           createPatient(newPatient).then(() => history.push(`/patients/${newPatient.id}`))
       }else{
           updatePatient(patient).then(() => history.push(`/patient/${patient.id}`))
       }
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setPatient({...patient, [name]:value})
     
    }

    if(loadingInitial) return <LoadingComponent content='Loading patient...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input  placeholder ='name'       value={patient.name} name='name' onChange={handleInputChange} />
                <Form.Input  placeholder ='surname'    value={patient.surname} name='surame' onChange={handleInputChange}/>
                <Form.Input  type ='date' placeholder ='dateofbirth'value={patient.dateofbirth} name='dateofbirth' onChange={handleInputChange} />
                <Form.Input  placeholder ='gender'     value={patient.gender} name='gender' onChange={handleInputChange} />
                <Form.Input  placeholder ='street_address' value={patient.street_address} name='street_address' onChange={handleInputChange} />
                <Form.Input  placeholder ='city'        value={patient.city} name='city' onChange={handleInputChange} />
                <Form.Input  placeholder ='country'     value={patient.country} name='country' onChange={handleInputChange} />
                <Form.Input  placeholder ='postal_code' value={patient.postal_code} name='postal_code' onChange={handleInputChange} />
                <Form.Input  placeholder ='phone'       value={patient.phone} name='phone' onChange={handleInputChange}/>
                <Form.Input  placeholder ='weight'      value={patient.weight} name='weight' onChange={handleInputChange}/>
                <Form.TextArea  placeholder ='other_det' value={patient.other_det} name='other_det' onChange={handleInputChange} />
                <Form.Input  type ='date' placeholder ='register_date' value={patient.register_date} name='register_date' onChange={handleInputChange}/>
                <Button loading={loading} floated = 'right' positive type='submit' content='Submit' />
                <Button as={Link} to='/patients' floated = 'right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})