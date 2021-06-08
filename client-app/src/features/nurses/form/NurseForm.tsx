import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';


export default observer(function NurseForm() {
    const history = useHistory();
    const {nurseStore} = useStore();
    const{createNurse, updateNurse, loading, loadNurse, loadingInitial} = nurseStore;
    const {id} = useParams<{id: string}>();

    const [nurse, setNurse] = useState({
        id: '',
        emri: '',
        mbiemri: '',
        username: '',
        datelindja: '',
        adresa: '',
        qyteti: '',
        email: '',
        gjinia: '',
        paga:  0
    });

    useEffect(() => {
        if(id) loadNurse(id).then(nurse => setNurse(nurse!))
    },[id, loadNurse]);


    function handleSubmit() {
       if(nurse.id.length === 0){
           let newNurse = {
               ...nurse,
               id: uuid()
           };
           createNurse(newNurse).then(() => history.push(`/nurse/${newNurse.id}`))
       }else{
           updateNurse(nurse).then(() => history.push(`/nurses/${nurse.id}`))
       }
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setNurse({...nurse, [name]: value})
    }

    if(loadingInitial) return <LoadingComponent content='Loading nurse ...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={nurse.emri} name='emri' onChange={handleInputChange} />
                <Form.Input placeholder='Last Name' value={nurse.mbiemri} name='mbiemri' onChange={handleInputChange} />
                <Form.Input placeholder='Username' value={nurse.username} name='username' onChange={handleInputChange} />
                <Form.Input type='email' placeholder='Email' value={nurse.email} name='email' onChange={handleInputChange} />
                <Form.Input type='date' placeholder='Birthday' value={nurse.datelindja} name='datelindja' onChange={handleInputChange} />
                <Form.Input placeholder='Gender' value={nurse.gjinia} name='gjinia' onChange={handleInputChange} />
                <Form.Input placeholder='Addres' value={nurse.adresa} name='adresa' onChange={handleInputChange} />
                <Form.Input placeholder='City' value={nurse.qyteti} name='qyteti' onChange={handleInputChange}/>
                <Form.Input placeholder='Paga' value={nurse.paga} name='paga' onChange={handleInputChange}/>
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/receptionists' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})