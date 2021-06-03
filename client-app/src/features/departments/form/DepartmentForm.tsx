import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';

interface Props {
    department: Department | undefined;
    closeForm: () => void;
    createOrEdit: (department: Department) => void;
    submitting: boolean;
}

export default function DepartmentForm({department: selectedDepartment, closeForm, 
    createOrEdit, submitting}: Props) {

const initialState = selectedDepartment ?? {
    id: '',
    departmentName: ''
}

const [department, setDepartment] = useState(initialState);

function handleSubmit() {
    createOrEdit(department);
}

function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const {name, value} = event.target;
    setDepartment({...department, [name]: value})
}

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Name' value={department.departmentName} name='departmentName' onChange={handleInputChange} />
                {/* <Form.TextArea placeholder='Description' value={department.?????????} name='??????' onChange={handleInputChange} /> ***Will be added later in the Department crud*** */}
                <Button loading={submitting} floated='right' positive type='submit' content='Submit' />
                <Button onClick={closeForm} floated='right' type='submit' content='Cancel' />
            </Form>
        </Segment>
    )
}