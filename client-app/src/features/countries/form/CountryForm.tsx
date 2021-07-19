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
import { Country } from '../../../app/models/country';
import { callingCodeOptions } from '../../../app/common/options/callingCodeOptions';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { continentOptions } from '../../../app/common/options/continentsOptions';
import { currencyOptions } from '../../../app/common/options/currencyOptions';
import { timeZoneOptions } from '../../../app/common/options/timeZoneOptions';

export default observer(function CountryForm() {
    const history = useHistory();
    const { countryStore, cityStore } = useStore();
    const { createCountry, updateCountry, loadCountry, loadingInitial } = countryStore;
    const { id } = useParams<{ id: string }>();

    const { cityRegistry, loadCities } = cityStore;
    let cities = [...cityRegistry.values()];

    const [country, setCountry] = useState<Country>({ //
        id: '',
        countryName: '',
        latLong: '',
        population: '',
        area: '',
        timeZone: '',
        callingCode: '',
        capital: '',
        continent: '',
        currency: '',
    });

    const validationSchema = Yup.object({
        countryName: Yup.string().required('Country Name is required'),
        latLong: Yup.string().required(),
        population: Yup.string().required(),
        area: Yup.string().required(),
        timeZone: Yup.string().required(),
        callingCode: Yup.string().required(),
        capital: Yup.string().required(),
        continent: Yup.string().required(),
        currency: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadCountry(id).then(country => setCountry(country!))
        if (cityRegistry.size <= 1) loadCities();
    }, [id, loadCountry, cityRegistry.size, loadCities]);

    function handleFormSubmit(country: Country) {
        if (!country.id) {
            let newCountry = {
                ...country,
                id: uuid()
            };
            createCountry(newCountry).then(() => history.push(`/countries/${newCountry.id}`))
        } else {
            updateCountry(country).then(() => history.push(`/countries/${country.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading countries...' />

    return (
        <Segment clearing>
            <Header content='Country Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={country}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput name='countryName' placeholder='Country Name' />
                        <MyTextInput name='latLong' placeholder='Latitude Longitude' />
                        <MyTextInput name='population' placeholder='Population' type="number" />
                        <MyTextInput name='area' placeholder='Area' />
                        <MySelectInput options={timeZoneOptions} name='timeZone' placeholder='Time Zone' />
                        <MySelectInput options={callingCodeOptions}  name='callingCode' placeholder='Calling Code' />
                        <Field as="select" name="capital" pleaceholder="Capital">
                            {cities.map(city =>
                                <option key={city.id} value={city.cityName}>{city.cityName}</option>
                            )};
                        </Field>
                        <Header/>
                        <MySelectInput options={continentOptions} name='continent' placeholder='Continent' />
                        <MySelectInput options={currencyOptions} name='currency' placeholder='Currency' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting}
                            floated='right'
                            positive type='submit'
                            content='Submit' />
                        <Button as={Link} to='/countries' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})