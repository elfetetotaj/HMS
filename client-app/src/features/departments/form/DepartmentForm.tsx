import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid} from 'uuid';

export default observer(function DepartmentForm() {
    const history = useHistory();
    const { departmentStore } = useStore();
    const { createDepartment, updateDepartment, 
        loading, loadDepartment, loadingInitial} = departmentStore;
    const {id} = useParams<{id: string}>();

    const [department, setDepartment] = useState({
        id: '',
        departmentName: ''
    });

    useEffect(() => {
        if (id) loadDepartment(id).then(department => setDepartment(department!))
    }, [id, loadDepartment]);

    function handleSubmit() {
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

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setDepartment({ ...department, [name]: value })
    }

    if (loadingInitial) return <LoadingComponent content='Loading department...' />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={department.departmentName} name='departmentName' onChange={handleInputChange} />
                {/* <Form.TextArea placeholder='Description' value={department.?????????} name='??????' onChange={handleInputChange} /> ***Will be added later in the Department crud*** */}
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/departments' floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
})