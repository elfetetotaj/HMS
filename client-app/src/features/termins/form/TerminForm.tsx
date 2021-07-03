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
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Termin } from '../../../app/models/termin';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default observer(function TerminForm() {
    const history = useHistory();
    const { terminStore } = useStore();
    const { createTermin, updateTermin, loadTermin, loadingInitial} = terminStore;
    const { id } = useParams<{ id: string }>();

    const [termin, setTermin] = useState<Termin>({ //
        id: '',
        terminTime: null,
        terminDescription: '',
        terminDepartment: '',
        terminDoctor: ''
    });

    const validationSchema = Yup.object({
        terminTime: Yup.string().required('The appointment time and date is required'),
        terminDescription: Yup.string().required('The appointment description is required'),
        terminDepartment: Yup.string().required('The appointment department is required'),
        terminDoctor: Yup.string().required('The appointment doctor is required'),
    })

    useEffect(() => {
        if (id) loadTermin(id).then(termin => setTermin(termin!))
    }, [id, loadTermin]);

    function handleFormSubmit(termin: Termin) {
        if (!termin.id) {
            let newTermin = {
                ...termin,
                id: uuid()
            };
            createTermin(newTermin).then(() => history.push(`/termins/${newTermin.id}`))
        } else {
            updateTermin(termin).then(() => history.push(`/termins/${termin.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading appointments...' />

    return (
        <Segment clearing>
            <Header content='Appointment Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={termin} 
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyDateInput
                            placeholderText='Time and Date'
                            name='terminTime'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextArea rows={3} name='terminDescription' placeholder='Description' />
                        <MyTextInput name='terminDepartment' placeholder='Department' />
                        <MyTextInput name='terminDoctor' placeholder='Doctor' />
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={isSubmitting} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/termins' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})