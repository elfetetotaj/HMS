import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Surgery } from '../../../app/models/surgery';
import MyTextArea from '../../../app/common/form/MyTextArea';


export default observer(function SurgeryForm() {
    const history = useHistory();
    const { surgeryStore } = useStore();
    const { createSurgery, updateSurgery, loading, loadSurgery, loadingInitial } = surgeryStore;
    const { id } = useParams<{ id: string }>();

    const [surgery, setSurgery] = useState<Surgery>({
        Id: '',
        SurgeryName: '',
        Date: null,
        Description: '',
        Pagesa: 0,
        Terapia: '',

    });

    const validationSchema = Yup.object({
        SurgeryName: Yup.string().required(),
        Date: Yup.string().required(),
        Descrption: Yup.string().required(),
        Pagesa: Yup.string().required(),
        Terapia: Yup.string().required(),

    })

    useEffect(() => {
        if (id) loadSurgery(id).then(surgery => setSurgery(surgery!))
    }, [id, loadSurgery]);


    function handleFormSubmit(surgery: Surgery) {
        if (!surgery.Id) {
            let newSurgery = {
                ...surgery,
                id: uuid()
            };
            createSurgery(newSurgery).then(() => history.push(`/surgeries/${newSurgery.Id}`))
        } else {
            updateSurgery(surgery).then(() => history.push(`/surgeries/${surgery.Id}`))
        }
    }


    if (loadingInitial) return <LoadingComponent content='Loading surgery ...' />

    return (
        <Segment clearing>
            <Header content='Surgery Details' sub color='teal' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={surgery} onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>



                        <MyTextInput name='SurgeryName' placeholder='SurgeryName' />

                        <MyDateInput
                            placeholderText='Date'
                            name='Date'

                            timeCaption='time'
                            dateFormat='MMMM d, yyyy'

                        />

                        <MyTextArea  rows={3} placeholder='Description' name='Description' />

                        
                        <MyTextInput placeholder='Pagesa' name='Pagesa' />

                        <MyTextInput placeholder='Terapia' name='Terapia' />

                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading}
                            floated='right' 
                            positive type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/surgeries' floated='right' type='button' content='Cancel' />
                    </Form>
                )}

            </Formik>


        </Segment>
    )
})