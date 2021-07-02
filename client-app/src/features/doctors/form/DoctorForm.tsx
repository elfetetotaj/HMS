import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { cityOptions } from '../../../app/common/options/cityOptions';
import { countryOptions } from '../../../app/common/options/countryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Doctor } from '../../../app/models/doctor';



export default observer(function DoctorForm(){
    const history = useHistory();
    const {doctorStore} = useStore();
    const {createDoctor, updateDoctor, 
            loading, loadDoctor, loadingInitial} = doctorStore;
    const {id} = useParams<{id: string}>();

    const [doctor, setDoctor] =useState<Doctor>({
        id: '',
        name: '',
        surname: '',
        dateofbirth: null,
        gender: '',
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        phone: '',
        designation: '',
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The patient name is required'),
        surname: Yup.string().required('The patient surname is required'),
        dateofbirth: Yup.string().required("The Date of Birth is required").nullable(),
        gender: Yup.string().required(),
        street_address: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
        postal_code: Yup.string().required(),
        phone: Yup.string().required(),
        designation: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadDoctor(id).then(doctor => setDoctor(doctor!))
    }, [id, loadDoctor]);

    function handleFormSubmit(doctor: Doctor){
       if (doctor.id.length === 0 ) {
           let newDoctor ={
               ...doctor,
               id:uuid()
           };
           createDoctor(newDoctor).then(() => history.push(`/doctors/${newDoctor.id}`))
       }else{
           updateDoctor(doctor).then(() => history.push(`/doctors/${doctor.id}`))
       }
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setDoctor({...doctor, [name]:value})
     
    }

    if(loadingInitial) return <LoadingComponent content='Loading doctor...' /> 

    return(
        <Segment clearing>
             <Header content='Doctor Details' sub color='teal' />
            <Formik 
            validationSchema ={validationSchema}
            enableReinitialize 
            initialValues={doctor} 
            onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                    <MyTextInput name='name' placeholder='Name' />
                    <MyTextInput placeholder ='surname'   name='surname' />
                    <MyDateInput
                        placeholderText ='dateofbirth' 
                        name='dateofbirth'
                    />
                    <MyTextInput  placeholder ='gender'    name='gender'  />
                    <MyTextInput placeholder ='street_address' name='street_address'  />
                    <MySelectInput options={cityOptions} placeholder ='city'    name='city'  />
                    <MySelectInput options={countryOptions} placeholder ='country'  name='country'  />
                    <MyTextInput placeholder ='postal_code' name='postal_code'  />
                    <MyTextInput placeholder ='phone'   name='phone' />
                    <MyTextInput placeholder ='designation'   name='designation' />
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} floated = 'right'
                        positive type='submit' content='Submit' />
                    <Button as={Link} to='/doctors' floated = 'right'  type='button' content='Cancel' />  
                </Form>                 
                )}
            </Formik>
        </Segment>
    )
})