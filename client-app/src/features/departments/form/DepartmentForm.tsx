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
import { Department } from '../../../app/models/department';

export default observer(function DepartmentForm() {
    const history = useHistory();
    const { departmentStore } = useStore();
    const { createDepartment, updateDepartment, 
        loading, loadDepartment, loadingInitial} = departmentStore;
    const {id} = useParams<{id: string}>();

    const [department, setDepartment] = useState<Department>({
        id: '',
        departmentName: ''
    });

    const validationSchema = Yup.object({
        departmentName: Yup.string().required('The department name is required'),
        // departmentDescription: Yup.string().required('The department description is required')
    })

    useEffect(() => {
        if (id) loadDepartment(id).then(department => setDepartment(department!))
    }, [id, loadDepartment]);

    function handleFormSubmit(department: Department) {
        if (department.id.length === 0) {
            let newDepartment = {
                ...department,
                id: uuid()
            };
            createDepartment(newDepartment).then(() => history.push(`/departments/${newDepartment.id}`))
        } else {
            updateDepartment(department).then(() => history.push(`/departments/${department.id}`))
        }
    }

    if (loadingInitial) return <LoadingComponent content='Loading department...' />

    return (
        <Segment clearing>
            <Header content='Department Details' sub color='teal' />
            <Formik 
            validationSchema={validationSchema}
            enableReinitialize 
            initialValues={department} 
            onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <MyTextInput name='departmentName' placeholder='Name' />
                        {/* <MyTextArea rows={3} name='departmentDescription' placeholder='Description' />
                        <Field placeholder='Description' value={department.?????????} name='??????' /> ***Will be added later in the Department crud*** dont write value */}
                        <Button 
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} 
                            floated='right' 
                            positive type='submit' 
                            content='Submit' />
                        <Button as={Link} to='/departments' floated='right' type='submit' content='Cancel' />
                    </Form>
                )}
            </Formik>
        </Segment>
    )
})