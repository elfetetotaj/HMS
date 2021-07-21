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
import MyTextArea from '../../../app/common/form/MyTextArea';
import { Surgery } from '../../../app/models/surgery';
import MyDateInput from '../../../app/common/form/MyDateInput';

export default observer(function SurgeryForm() {
    const history = useHistory();
    const { surgeryStore, therapyStore, patientStore, doctorStore } = useStore();
    const { createSurgery, updateSurgery, loadSurgery, loadingInitial } = surgeryStore;
    const { id } = useParams<{ id: string }>();

    const { therapyRegistry, loadTherapies } = therapyStore;
    let therapies = [...therapyRegistry.values()];

    const { doctorRegistry, loadDoctors } = doctorStore;
    let doctors = [...doctorRegistry.values()];

    const { patientRegistry, loadPatients } = patientStore;
    let patients = [...patientRegistry.values()];

    const [surgery, setSurgery] = useState<Surgery>({
        id: '',
        surgeryName: '',
        date: null,
        description: '',
        pagesa: '',
        terapia: '',
        doctor: '',
        patient: '',

    });

    const validationSchema = Yup.object({
        surgeryName: Yup.string().required(),
        date: Yup.string().required(),
        descrption: Yup.string().required(),
        pagesa: Yup.string().required(),
        terapia: Yup.string().required(),
        doctor: Yup.string().required(),
        patient: Yup.string().required(),

    })
    useEffect(() => {
        if (id) loadSurgery(id).then(surgery => setSurgery(surgery!))
        if (therapyRegistry.size <= 1) loadTherapies();
        if (doctorRegistry.size <= 1) loadDoctors();
        if (patientRegistry.size <= 1) loadPatients();
    }, [id, loadSurgery, 
        therapyRegistry, loadTherapies,
        doctorRegistry, loadDoctors,
        patientRegistry, loadPatients]);

    function handleFormSubmit(surgery: Surgery) {
        if (!surgery.id) {
            let newSurgery = {
                ...surgery,
                id: uuid()
            };
            createSurgery(newSurgery).then(() => history.push(`/surgeries/${newSurgery.id}`))
        } else {
            updateSurgery(surgery).then(() => history.push(`/surgeries/${surgery.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading surgeries...' />

    return (
        <Segment clearing>
            <Header content='Surgery Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={surgery}
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>

                        <MyTextInput name='surgeryName' placeholder='Surgery Name' />
                        <MyDateInput
                            placeholderText='Data'
                            name='date'
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMMM d, yyyy h:mm aa'
                        />
                        <MyTextArea name='description' placeholder='Pershkrimi i operacionit' rows={3} />
                        <MyTextInput name='pagesa' placeholder='Pagesa' />
                        <Field as="select" name="capital" pleaceholder="Capital">
                            {therapies.map(ther =>
                                <option key={ther.id} value={ther.therapyName}>{ther.therapyName}</option>
                            )};
                        </Field> <br />
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
                        <Button as={Link} to='/surgeries' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})

