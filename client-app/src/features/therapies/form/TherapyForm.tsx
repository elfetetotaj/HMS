import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, List, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Therapy } from '../../../app/models/therapy';
import MyTextInput from '../../../app/common/form/MyTextInput';

export default observer(function TherapyForm() {
    const history = useHistory();
    const { therapyStore, doctorStore, patientStore } = useStore();
    const { createTherapy, updateTherapy, loadTherapy, loadingInitial } = therapyStore;
    const { id } = useParams<{ id: string }>();

    const { doctorRegistry, loadDoctors } = doctorStore;
    let doctors = [...doctorRegistry.values()];

    const { patientRegistry, loadPatients } = patientStore;
    let patients = [...patientRegistry.values()];

    const [therapy, setTherapy] = useState<Therapy>({
        id: '',
        pershkrimi: '',
        therapyName: '',
        doctor: '',
        patient: '',
    });

    const validationSchema = Yup.object({
        pershkrimi: Yup.string().required('Pershkrimi is required'),
        therapyName: Yup.string().required('Therapy name is required'),
        doctor: Yup.string().required('Doctor is required'),
        patient: Yup.string().required('Patient is required'),
    })

    useEffect(() => {
        if (id) loadTherapy(id).then(therapy => setTherapy(therapy!))
        if (doctorRegistry.size <= 1) loadDoctors();
        if (patientRegistry.size <= 1) loadPatients();
    }, [id, loadTherapy,
        doctorRegistry, loadDoctors,
        patientRegistry, loadPatients]);

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
                        <MyTextInput name="therapyName" placeholder="Therapy Name" />
                        <MyTextArea rows={3} name='pershkrimi' placeholder='Pershkrimi' />
                        <Field as="select" name="doctor" pleaceholder="Doctor">
                            {doctors.map(doc =>
                                <option key={doc.id} value={doc.name}>{doc.name}</option>
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
                        <Button as={Link} to='/therapies' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})