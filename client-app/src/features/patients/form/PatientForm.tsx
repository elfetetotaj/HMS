import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea'; 
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Patient } from '../../../app/models/patient';


export default observer(function PatientForm(){
    const history = useHistory();
    const { patientStore } = useStore();
    const { createPatient, updatePatient, 
            loading, loadPatient, loadingInitial } = patientStore;
    const {id} = useParams<{ id: string }>();

    const [patient, setPatient] = useState<Patient>({ //
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
        weight: '',
        other_det: '',
        register_date: null
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
        weight: Yup.string().required(),
        other_det: Yup.string().required(),
        register_date: Yup.string().required('The Register Date is required').nullable(),
    })

    useEffect(() => {
        if (id) loadPatient(id).then(patient => setPatient(patient!))
    }, [id, loadPatient]);

      function handleFormSubmit(patient: Patient){
       if (patient.id.length === 0 ) {
           let newPatient ={
               ...patient,
               id:uuid()
           };
           createPatient(newPatient).then(() => history.push(`/patients/${newPatient.id}`))
       }else{
           updatePatient(patient).then(() => history.push(`/patients/${patient.id}`))
       }
    }

    if(loadingInitial) return <LoadingComponent content='Loading patient...' />

    return(
        <Segment clearing>
            <Header content='Patient Details' sub color='teal' />
            <Formik 
            validationSchema ={validationSchema}
            enableReinitialize 
            initialValues={patient} 
            onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                    <MyTextInput name='name' placeholder='Name' />
                    <MyTextInput placeholder ='surname'   name='surname' />
                    <MyDateInput
                        placeholderText ='dateofbirth' 
                        name='dateofbirth'
                    />
                    <MyTextInput placeholder ='gender'    name='gender'  />
                    <MyTextInput placeholder ='street_address' name='street_address'  />
                    <MyTextInput placeholder ='city'    name='city'  />
                    <MyTextInput placeholder ='country'  name='country'  />
                    <MyTextInput placeholder ='postal_code' name='postal_code'  />
                    <MyTextInput placeholder ='phone'   name='phone' />
                    <MyTextInput placeholder ='weight'   name='weight' />
                    <MyTextArea rows={5}  placeholder ='other_det'  name='other_det'  />
                    <MyDateInput
                    placeholderText ='register_date' 
                    name='register_date'
                    showTimeSelect
                    timeCaption='time'
                    dateFormat='MMMM d, yyyy h:mm aa'
                    />
                    <Button 
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={isSubmitting} 
                        floated = 'right'
                        positive type='submit' 
                        content='Submit' />
                    <Button as={Link} to='/patients' floated = 'right'  type='button' content='Cancel' />  
                </Form>                 
                )}
            </Formik>
        </Segment>
    )
})