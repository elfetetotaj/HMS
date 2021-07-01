import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Receptionist } from '../../../app/models/receptionist';
import { genderOptions } from '../../../app/common/options/genderOptions';
import { ndrrimi } from '../../../app/common/options/genderOptions';


export default observer(function ReceptionistForm() {
    const history = useHistory();
    const { receptionistStore } = useStore();
    const { createReceptionist, updateReceptionist, loading, loadReceptionist, loadingInitial } = receptionistStore;
    const { id } = useParams<{ id: string }>();

    const [receptionist, setReceptionist] = useState<Receptionist>({
        id: '',
        name: '',
        lastName: '',
        username: '',
        password: '',
        email: '',
        dob: null,
        gender: '',
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        phone: '',
        department: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The receptionist name is required'),
        lastname: Yup.string().required('The receptionist lastname is required'),
        username: Yup.string().required('The receptionist username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('Email is required'),
        dob: Yup.string().required('Date is required').nullable(),
        gender: Yup.string().required('Gender is required'),
        street_address: Yup.string().required('Addres is required is required'),
        city: Yup.string().required('City is required'),
        country: Yup.string().required('Country is required'),
        postal_code: Yup.string().required(),
        phone: Yup.string().required('Country is required'),
        department: Yup.string().required('Country is required'),
    })

    useEffect(() => {
        if (id) loadReceptionist(id).then(receptionist => setReceptionist(receptionist!))
    }, [id, loadReceptionist]);


    function handleFormSubmit(receptionist: Receptionist) {
        if (receptionist.id.length === 0) {
            let newReceptionist = {
                ...receptionist,
                id: uuid()
            };
            createReceptionist(newReceptionist).then(() => history.push(`/receptionists/${newReceptionist.id}`))
        } else {
            updateReceptionist(receptionist).then(() => history.push(`/receptionists/${receptionist.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading receptionist ...' />

    return (
        <Segment clearing>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={receptionist}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='lastname' placeholder='Lastname' />
                        <MyTextInput name='password' placeholder='Password' />
                        <MyTextInput name='email' placeholder='Email' />

                        <MyDateInput
                            placeholderText='Date od birth'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MySelectInput options={ndrrimi} placeholder='Nderrimi' name='username' />

                        <MySelectInput options={genderOptions} placeholder='Gjinia' name='gender' />
                        <MySelectInput options={genderOptions} placeholder='Gjinia' name='gender' />

                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='Addres' name='addres' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Country' name='country' />
                        <MyTextInput placeholder='PostalCode' name='postal_code' />
                        <MyTextInput placeholder='Phone' name='phone' />
                        <MyTextInput placeholder='Department' name='department' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right'
                            positive type='submit' content='Submit' />
                        <Button as={Link} to='/receptionists' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})