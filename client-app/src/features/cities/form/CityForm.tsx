import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import { City } from '../../../app/models/city';

export default observer(function CityForm() {
    const history = useHistory();
    const { cityStore } = useStore();
    const { createCity, updateCity, loadCity, loadingInitial} = cityStore;
    const { id } = useParams<{ id: string }>();

    const [city, setCity] = useState<City>({ //
        id: '',
        cityName: '',
        zipCode: '',
    });

    const validationSchema = Yup.object({
        cityName: Yup.string().required('City Name is required'),
        zipCode: Yup.string().required('Zip Code is required'),
    })

    useEffect(() => {
        if (id) loadCity(id).then(city => setCity(city!))
    }, [id, loadCity]);

    function handleFormSubmit(city: City) {
        if (!city.id) {
            let newCity = {
                ...city,
                id: uuid()
            };
            createCity(newCity).then(() => history.push(`/cities/${newCity.id}`))
        } else {
            updateCity(city).then(() => history.push(`/cities/${city.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading cities...' />

    return (
        <Segment clearing>
            <Header content='City Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={city} 
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput name='cityName' placeholder='City Name' type="text"/>
                        <MyTextInput name='zipCode' placeholder='Zip Code' type="number"/>
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/cities' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})