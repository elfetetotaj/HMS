import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';


export default observer(function ReceptionistForm() {
    const {receptionistStore} = useStore();
    const{selectedReceptionist, closeForm, createReceptionist, updateReceptionist, loading} = receptionistStore;

    const initialState = selectedReceptionist ?? {
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
    }

    const [receptionist, setReceptionist] = useState(initialState);

    function handleSubmit() {
        receptionist.id ? updateReceptionist(receptionist) : createReceptionist(receptionist);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setReceptionist({...receptionist, [name]: value})
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={receptionist.name} name='name' onChange={handleInputChange} />
                <Form.Input placeholder='Last Name' value={receptionist.lastName} name='lastName' onChange={handleInputChange} />
                <Form.Input placeholder='Username' value={receptionist.username} name='username' onChange={handleInputChange} />
                <Form.Input type='email' placeholder='Email' value={receptionist.email} name='email' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Birthday' value={receptionist.dob} name='dob' onChange={handleInputChange} />
                <Form.Input placeholder='Gender' value={receptionist.gender} name='gender' onChange={handleInputChange} />
                <Form.Input placeholder='Addres' value={receptionist.street_address} name='dtreet_address' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={receptionist.city} name='city' onChange={handleInputChange}/>
                <Form.Input placeholder='Country' value={receptionist.country} name='country' onChange={handleInputChange}/>
                <Form.Input placeholder='PostalCode' value={receptionist.postal_code} name='postal_code' onChange={handleInputChange}/>
                <Form.Input type='int' placeholder='Phone' value={receptionist.phone} name='phone' onChange={handleInputChange}/>
                <Form.Input placeholder='Department' value={receptionist.department} name='department' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})