import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { useEffect } from 'react';
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
import { EmergencyDriver } from '../../../app/models/emergencyDriver';
import { genderOptions } from '../../../app/common/options/genderOptions';



export default observer(function EmergencyDriverForm() {
    const history = useHistory();
    const { emergencyDriverStore, cityStore, countryStore, departmentStore } = useStore();
    const { createEmergencyDriver, updateEmergencyDriver, loadEmergencyDriver, loadingInitial } = emergencyDriverStore;
    const { id } = useParams<{ id: string }>();

    const { cityRegistry, loadCities } = cityStore;
    let cities = [...cityRegistry.values()];
    const { countryRegistry, loadCountries } = countryStore;
    let countries = [...countryRegistry.values()];
    const { departmentRegistry, loadDepartments } = departmentStore;
    let departments = [...departmentRegistry.values()];

    const [emergencyDriver, setEmergencyDriver] = useState<EmergencyDriver>({
        id: '',
        name: '',
        surname: '',
        username: '',
        password: '',
        dateofbirth: null,
        gender: '',
        street_address: '',
        city: '',
        country: '',
        postal_code: '',
        phone: '',
        department: '',
    });

    const validationSchema = Yup.object({
        name: Yup.string().required(),
        surname: Yup.string().required(),
        username: Yup.string().required(),
        dateofbirth: Yup.string().required().nullable(),
        gender: Yup.string().required(),
        street_address: Yup.string().required(),
        city: Yup.string().required(),
        country: Yup.string().required(),
        postal_code: Yup.string().required(),
        phone: Yup.string().required(),
        department: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadEmergencyDriver(id).then(emergencyDriver => setEmergencyDriver(emergencyDriver!))
        if (cityRegistry.size <= 1) loadCities()
        if (countryRegistry.size <= 1) loadCountries()
        if (departmentRegistry.size <= 1) loadDepartments()
    }, [id, loadEmergencyDriver,
        cityRegistry.size, loadCities,
        countryRegistry.size, loadCountries,
        departmentRegistry.size, loadDepartments]);

    function handleFormSubmit(emergencyDriver: EmergencyDriver) {
        if (!emergencyDriver.id) {
            let newEmergencyDriver = {
                ...emergencyDriver,
                id: uuid()
            };
            createEmergencyDriver(newEmergencyDriver).then(() => history.push(`/emergencyDrivers/${newEmergencyDriver.id}`))
        } else {
            updateEmergencyDriver(emergencyDriver).then(() => history.push(`/emergencyDrivers/${emergencyDriver.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading emergencyDriver...' />

    return (
        <Segment clearing>
            <Header content='EmergencyDriver Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={emergencyDriver}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput name='name' placeholder='Name' />
                        <MyTextInput placeholder='Surname' name='surname' />
                        <MyTextInput placeholder='Username' name='username' />
                        <MyTextInput placeholder='Password' name='password' type='password' />
                        <MyDateInput
                            placeholderText='Dateofbirth'
                            name='dateofbirth'
                        />
                        <MyTextInput placeholder='Street_address' name='street_address' />
                        <MyTextInput placeholder='Postal_code' name='postal_code' />
                        <MyTextInput placeholder='Phone' name='phone' />
                        <MySelectInput options={genderOptions} placeholder='Gender' name='gender' />
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
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Submit' />
                        <Button as={Link} to='/emergencyDrivers' floated='right' type='button' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})