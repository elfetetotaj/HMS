import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function DepartmentForm() {
    const { departmentStore } = useStore();
    const {selectedDepartment, closeForm, createDepartment, updateDepartment, loading} = departmentStore;

    const initialState = selectedDepartment ?? {
        id: '',
        departmentName: ''
    }

    const [department, setDepartment] = useState(initialState);

    function handleSubmit() {
        department.id ? updateDepartment(department) : createDepartment(department);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setDepartment({ ...department, [name]: value })
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={department.departmentName} name='departmentName' onChange={handleInputChange} />
                {/* <Form.TextArea placeholder='Description' value={department.?????????} name='??????' onChange={handleInputChange} /> ***Will be added later in the Department crud*** */}
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
})