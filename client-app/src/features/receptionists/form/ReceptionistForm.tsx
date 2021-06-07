import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer(function ReceptionistForm() {
    const history = useHistory();
    const {receptionistStore} = useStore();
    const{createReceptionist, updateReceptionist, loading, loadReceptionist, loadingInitial} = receptionistStore;
    const {id} = useParams<{id: string}>();

    const [receptionist, setReceptionist] = useState({
        id: '',
        name: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        dob: '',
        gender: '',
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        phone: '',
        department: ''
    });

    useEffect(() => {
        if(id) loadReceptionist(id).then(receptionist => setReceptionist(receptionist!))
    },[id, loadReceptionist]);


    function handleSubmit() {
       if(receptionist.id.length === 0){
           let newReceptionist = {
               ...receptionist,
               id: uuid()
           };
           createReceptionist(newReceptionist).then(() => history.push(`/receptionists/${receptionist.id}`))
       }else{
           updateReceptionist(receptionist).then(() => history.push(`/receptionists/${receptionist.id}`))
       }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setReceptionist({...receptionist, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading receptionist ...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={receptionist.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Last Name' value={receptionist.lastName} name='lastName' onChange={handleInputChange} />
                <Form.Input placeholder='Username' value={receptionist.username} name='username' onChange={handleInputChange} />
                <Form.Input type='password' placeholder='Password' value={receptionist.password} name='password' onChange={handleInputChange} />
                <Form.Input type='email' placeholder='Email' value={receptionist.email} name='email' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Birthday' value={receptionist.dob} name='dob' onChange={handleInputChange} />
                <Form.Input placeholder='Gender' value={receptionist.gender} name='gender' onChange={handleInputChange} />
                <Form.Input placeholder='Addres' value={receptionist.street_address} name='street_address' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={receptionist.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Country' value={receptionist.country} name='country' onChange={handleInputChange}/>
                <Form.Input placeholder='PostalCode' value={receptionist.postal_code} name='postal_code' onChange={handleInputChange}/>
                <Form.Input type='int' placeholder='Phone' value={receptionist.phone} name='phone' onChange={handleInputChange}/>
                <Form.Input placeholder='Department' value={receptionist.department} name='department' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/receptionists' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})