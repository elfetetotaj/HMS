import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, List, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Therapy } from '../../../app/models/therapy';
import CityDetailedSidebar from '../../cities/details/CityDetailedSidebar';
import { City } from '../../../app/models/city';

export default observer(function TherapyForm() {
    const history = useHistory();
    const { therapyStore } = useStore();
    const { createTherapy, updateTherapy, loadTherapy, loadingInitial} = therapyStore;
    const { id } = useParams<{ id: string }>();

    const [therapy, setTherapy] = useState<Therapy>({
        id: '',
        Pershkrimi: '',

    });

    const validationSchema = Yup.object({
        Pershkrimi: Yup.string().required('Pershkrimi is required'),
    })

    useEffect(() => {
        if (id) loadTherapy(id).then(therapy => setTherapy(therapy!))
    }, [id, loadTherapy]);

    function handleFormSubmit(therapy: Therapy) {
        if (!therapy.id) {
            let newTherapy = {
                ...therapy,
                id: uuid()
            };
            createTherapy(newTherapy).then(() => history.push(`/therapies/${newTherapy.id}`))
        } else {
            updateTherapy(therapy).then(() => history.push(`/therapies/${therapy.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading therapy...' />

    return (
        <Segment clearing>
            <Header content='Therapy Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={therapy} 
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextArea rows={3} name='Pershkrimi' placeholder='Pershkrimi' />
                        {/* <List horizontal>
                            {cities.map(city =>(
                                <List.Item key={city.CityName}>
                                </List.Item>
                            ))}

                        </List> */}
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/therapies' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})