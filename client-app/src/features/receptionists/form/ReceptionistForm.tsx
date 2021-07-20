import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Receptionist } from '../../../app/models/receptionist';
import { genderOptions } from '../../../app/common/options/genderOptions';


export default observer(function ReceptionistForm() {
    const history = useHistory();
    const { receptionistStore, cityStore, countryStore, departmentStore, patientStore } = useStore();
    const { createReceptionist, updateReceptionist, loadReceptionist, loadingInitial } = receptionistStore;
    const { id } = useParams<{ id: string }>();

    const { cityRegistry, loadCities } = cityStore;
    let cities = [...cityRegistry.values()];
    const { countryRegistry, loadCountries } = countryStore;
    let countries = [...countryRegistry.values()];
    const { departmentRegistry, loadDepartments } = departmentStore;
    let departments = [...departmentRegistry.values()];
    const { patientRegistry, loadPatients } = patientStore;
    let patients = [...patientRegistry.values()];

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
        department: '',
        patient: ''
    });

    const validationSchema = Yup.object({
        name: Yup.string().required('The receptionist name is required'),
        lastname: Yup.string().required('The receptionist lastname is required'),
        username: Yup.string().required('The receptionist username is required'),
        password: Yup.string().required('Password is required'),
        email: Yup.string().required('Email is required').email('Please write an email!'),
        dob: Yup.string().required('Date is required').nullable(),
        gender: Yup.string().required('Gender is required'),
        street_address: Yup.string().required('Addres is required is required'),
        city: Yup.string().required('City is required'),
        country: Yup.string().required('Country is required'),
        postal_code: Yup.string().required(),
        phone: Yup.string().required(),
        department: Yup.string().required(),
        patient: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadReceptionist(id).then(receptionist => setReceptionist(receptionist!))
        if (cityRegistry.size <= 1) loadCities()
        if (countryRegistry.size <= 1) loadCountries()
        if (departmentRegistry.size <= 1) loadDepartments()
        if (patientRegistry.size <= 1) loadPatients()
    }, [id, loadReceptionist,
        cityRegistry.size, loadCities,
        countryRegistry.size, loadCountries,
        departmentRegistry.size, loadDepartments,
        patientRegistry, loadPatients]);


    function handleFormSubmit(receptionist: Receptionist) {
        if (!receptionist.id) {
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
            <Header content='Receptionist Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={receptionist}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput name='lastName' placeholder='Lastname' />
                        <MyTextInput name='username' placeholder='Username' />
                        <MyTextInput name='password' placeholder='Password' type="password" />
                        <MyTextInput name='email' placeholder='Email' />
                        <MyDateInput
                            placeholderText='Date of birth'
                            name='dob'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MySelectInput options={genderOptions} placeholder='Gender' name='gender' />
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder='Addres' name='street_address' />
                        <MyTextInput placeholder='PostalCode' name='postal_code' />
                        <MyTextInput placeholder='Phone' name='phone' />
                        <Field as="select" name="country" pleaceholder="Country">
                            {countries.map(con =>
                                <option key={con.id} value={con.countryName}>{con.countryName}</option>
                            )};
                        </Field> <br />
                        <Field as="select" name="city" pleaceholder="City">
                            {cities.map(city =>
                                <option key={city.id} value={city.cityName}>{city.cityName}</option>
                            )};
                        </Field><br />
                        <Field as="select" name="department" pleaceholder="Department">
                            {departments.map(dep =>
                                <option key={dep.id} value={dep.departmentName}>{dep.departmentName}</option>
                            )};
                        </Field> <br />
                        <Field as="select" name="patient" pleaceholder="Patien">
                            {patients.map(pat =>
                                <option key={pat.id} value={pat.name}>{pat.name}</option>
                            )};
                        </Field> <br />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Submit' />
                        <Button as={Link} to='/receptionists' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})