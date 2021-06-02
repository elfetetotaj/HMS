import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';

interface Props {
    department: Department;
    cancelSelectDepartment: () => void;
    openForm: (id: string) => void;
}

export default function DepartmentDetails({department, cancelSelectDepartment, openForm}: Props) {
    return (
        <Card fluid>
            <Image src={`/assets/departmentImages/${department.departmentName}.jpg`} />
            <Card.Content>
                <Card.Header>{department.departmentName}</Card.Header>
                {/* <Card.Description>
                    {department.description} ***Will be added later in the Department crud***
                </Card.Description> */}
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(department.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectDepartment} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}