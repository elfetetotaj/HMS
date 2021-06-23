import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, FormField, Label, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik,Form,Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { genderOptions } from '../../../app/common/options/genderOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Nurse } from '../../../app/models/nurse';


export default observer(function NurseForm() {
    const history = useHistory();
    const {nurseStore} = useStore();
    const{createNurse, updateNurse, loading, loadNurse, loadingInitial} = nurseStore;
    const {id} = useParams<{id: string}>();

    const [nurse, setNurse] = useState<Nurse>({
        id: '',
        emri: '',
        mbiemri: '',
        username: '',
        datelindja: null,
        adresa: '',
        qyteti: '',
        email: '',
        gjinia: '',
        paga:  0
    });

    const validationSchema = Yup.object({
        emri: Yup.string().required(),
        mbiemri: Yup.string().required(),
        username: Yup.string().required(),
        datelindja: Yup.string().required(),
        adresa: Yup.string().required(),
        qyteti: Yup.string().required(),
        email: Yup.string().required(),
        gjinia: Yup.string().required(),
        paga: Yup.string().required()

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
                         {/* <FormField>
                             <Field placeholder='Name' name='emri' />
                             <ErrorMessage name='emri'
                              render={error=><Label basic color='red' content={error}/>}/>
                         </FormField> */}
                   
                     <MyTextInput name='emri' placeholder='Emri'/>

                   
                     <MyTextInput placeholder='Mbiemri'  name='mbiemri' />
                     <MyTextInput placeholder='Username'  name='username' />
                     <MyTextInput  placeholder='Email'  name='email' />
                     <MyDateInput 
                     placeholderText='Datelindja'  
                     name='datelindja' 
                   
                     timeCaption='time'
                     dateFormat='MMMM d, yyyy'
                     
                     />
                     <MySelectInput options={genderOptions} placeholder='Gjinia'  name='gjinia' />
                     <MyTextInput placeholder='Adresa'  name='adresa' />
                     <MyTextInput placeholder='Qyteti'  name='qyteti'/>
                     <MyTextInput placeholder='Paga'  name='paga'/>
                     <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                     <Button as={Link} to='/nurses' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
                
            </Formik>
           
            
        </Segment>
    )
})