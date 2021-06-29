import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer(function DoctorForm(){
    const history = useHistory();
    const {doctorStore} = useStore();
    const {createDoctor, updateDoctor, 
            loading, loadDoctor, loadingInitial} = doctorStore;
    const {id} = useParams<{id: string}>();

    const [doctor, setDoctor] =useState({
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
        designation: '',
    });

    useEffect(() => {
        if (id) loadDoctor(id).then(doctor => setDoctor(doctor!))
    }, [id, loadDoctor]);

    function handleSubmit(){
       if (doctor.id.length === 0 ) {
           let newDoctor ={
               ...doctor,
               id:uuid()
           };
           createDoctor(newDoctor).then(() => history.push(`/doctor/${newDoctor.id}`))
       }else{
           updateDoctor(doctor).then(() => history.push(`/doctors/${doctor.id}`))
       }
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setDoctor({...doctor, [name]:value})
     
    }

    if(loadingInitial) return <LoadingComponent content='Loading patient...' />

    return(
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off' >
                <Form.Input  placeholder ='name'       value={doctor.name} name='name' onChange={handleInputChange} />
                <Form.Input  placeholder ='surname'    value={doctor.surname} name='surname' onChange={handleInputChange}/>
                <Form.Input  type ='date' placeholder ='dateofbirth'value={doctor.dateofbirth} name='dateofbirth' onChange={handleInputChange} />
                <Form.Input  placeholder ='gender'     value={doctor.gender} name='gender' onChange={handleInputChange} />
                <Form.Input  placeholder ='street_address' value={doctor.street_address} name='street_address' onChange={handleInputChange} />
                <Form.Input  placeholder ='city'        value={doctor.city} name='city' onChange={handleInputChange} />
                <Form.Input  placeholder ='country'     value={doctor.country} name='country' onChange={handleInputChange} />
                <Form.Input  placeholder ='postal_code' value={doctor.postal_code} name='postal_code' onChange={handleInputChange} />
                <Form.Input  placeholder ='phone'       value={doctor.phone} name='phone' onChange={handleInputChange}/>
                <Form.Input  placeholder ='designation'      value={doctor.designation} name='weight' onChange={handleInputChange}/>
                <Button loading={loading} floated = 'right' positive type='submit' content='Submit' />
                <Button as={Link} to='/doctors' floated = 'right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})