import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik,Form,Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


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

    const validationSchema = Yup.object({
        name: Yup.string().required('The nurse name is required')
    })

    useEffect(() => {
        if(id) loadNurse(id).then(nurse => setNurse(nurse!))
    },[id, loadNurse]);


    // function handleSubmit() {
    //    if(nurse.id.length === 0){
    //        let newNurse = {
    //            ...nurse,
    //            id: uuid()
    //        };
    //        createNurse(newNurse).then(() => history.push(`/nurse/${newNurse.id}`))
    //    }else{
    //        updateNurse(nurse).then(() => history.push(`/nurses/${nurse.id}`))
    //    }
    // }

    // function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    //     const {name, value} = event.target;
    //     setNurse({...nurse, [name]: value})
    // }

    if(loadingInitial) return <LoadingComponent content='Loading nurse ...' />

    return (
        <Segment clearing>
            <Formik validationSchema={validationSchema} enableReinitialize initialValues={nurse} onSubmit={values => console.log(values)}>
                {({values:nurse,handleChange,handleSubmit})=>(
                     <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                         <FormField>
                             <Field placeholder='Name' name='emri' />
                             <ErrorMessage name='emri'
                              render={error=><Label basic color='red' content={error}/>}/>
                         </FormField>
                   
                     
                     <Field placeholder='Last Name'  name='mbiemri' />
                     <Field placeholder='Username'  name='username' />
                     <Field type='email' placeholder='Email'  name='email' />
                     <Field type='date' placeholder='Birthday'  name='datelindja' />
                     <Field placeholder='Gender'  name='gjinia' />
                     <Field placeholder='Addres'  name='adresa' />
                     <Field placeholder='City'  name='qyteti'/>
                     <Field placeholder='Paga'  name='paga'/>
                     <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                     <Button as={Link} to='/receptionists' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
                
            </Formik>
           
            
        </Segment>
    )
})