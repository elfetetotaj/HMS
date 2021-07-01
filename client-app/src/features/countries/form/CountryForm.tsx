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
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Country } from '../../../app/models/country';

export default observer(function CountryForm() {
    const history = useHistory();
    const { countryStore } = useStore();
    const { createCountry, updateCountry, loadCountry, loadingInitial } = countryStore;
    const { id } = useParams<{ id: string }>();

    const [country, setCountry] = useState<Country>({
        Id: '',
        CountryName: '',
        Location: '',
        Population: '',
        Nation: '',
        Goverment: '',

    });

    const validationSchema = Yup.object({
        CountryName: Yup.string().required('Country Name is required'),
    })

    useEffect(() => {
        if (id) loadCountry(id).then(country => setCountry(country!))
    }, [id, loadCountry]);

    function handleFormSubmit(country: Country) {
        if (!country.Id) {
            let newCountry = {
                ...country,
                id: uuid()
            };
            createCountry(newCountry).then(() => history.push(`/countries/${newCountry.Id}`))
        } else {
            updateCountry(country).then(() => history.push(`/countries/${country.Id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading country...' />

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
                        <MyTextInput name="CountryName" placeholder="Country Name"/>
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