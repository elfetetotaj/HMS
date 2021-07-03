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
import { EmergencyDriver } from '../../../app/models/emergencyDriver';



export default observer(function EmergencyDriverForm(){
    const history = useHistory();
    const {emergencyDriverStore} = useStore();
    const {createEmergencyDriver, updateEmergencyDriver, 
            loading, loadEmergencyDriver, loadingInitial} = emergencyDriverStore;
    const {id} = useParams<{id: string}>();

    const [emergencyDriver, setEmergencyDriver] =useState<EmergencyDriver>({
        Id: '',
        Name: '',
        Surname: '',
        Username: '',
        Password: '',
        Dateofbirth: null,
        Gender: '',
        Street_address: '',
        City: '',
        Country: '',
        Postal_code: '',
        Phone: '',
        Department: '',
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The patient name is required'),
        surname: Yup.string().required('The patient surname is required'),
        dateofbirth: Yup.string().required("The Date of Birth is required").nullable(),
        Gender: Yup.string().required(),
        Street_address: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
        postal_code: Yup.string().required(),
        phone: Yup.string().required(),
        designation: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadEmergencyDriver(id).then(emergencyDriver => setEmergencyDriver(emergencyDriver!))
    }, [id, loadEmergencyDriver]);

    function handleFormSubmit(emergencyDriver: EmergencyDriver){
       if (emergencyDriver.Id.length === 0 ) {
           let newEmergencyDriver ={
               ...emergencyDriver,
               id:uuid()
           };
           createEmergencyDriver(newEmergencyDriver).then(() => history.push(`/emergencyDrivers/${newEmergencyDriver.id}`))
       }else{
           updateEmergencyDriver(emergencyDriver).then(() => history.push(`/emergencyDrivers/${emergencyDriver.Id}`))
       }
    }

    function handleInputChange (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setEmergencyDriver({...emergencyDriver, [name]:value})
     
    }

    if(loadingInitial) return <LoadingComponent content='Loading emergencyDriver...' /> 

    return(
        <Segment clearing>
             <Header content='EmergencyDriver Details' sub color='teal' />
            <Formik 
            validationSchema ={validationSchema}
            enableReinitialize 
            initialValues={emergencyDriver} 
            onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                    <MyTextInput name='Name' placeholder='Name' />
                    <MyTextInput placeholder ='Surname'   name='Surname' />
                    <MyTextInput placeholder ='Username'   name='Username' />
                    <MyTextInput placeholder ='Password'   name='Password' type='password' />
                    <MyDateInput
                        placeholderText ='dateofbirth' 
                        name='dateofbirth'
                    />
                    <MyTextInput  placeholder ='Gender'    name='Gender'  />
                    <MyTextInput placeholder ='Street_address' name='Street_address'  />
                    <MySelectInput options={cityOptions} placeholder ='City'    name='City'  />
                    <MySelectInput options={countryOptions} placeholder ='Country'  name='Country'  />
                    <MyTextInput placeholder ='Postal_code' name='Postal_code'  />
                    <MyTextInput placeholder ='Phone'   name='Phone' />
                    <MyTextInput placeholder ='Department'   name='Department' />
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading} floated = 'right'
                        positive type='submit' content='Submit' />
                    <Button as={Link} to='/emergencyDrivers' floated = 'right'  type='button' content='Cancel' />  
                </Form>                 
                )}
            </Formik>
        </Segment>
    )
})