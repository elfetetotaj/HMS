import React from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';

interface Props {
    departments: Department[];
    selectDepartment: (id: string) => void;
    deleteDepartment: (id: string) => void;
}

export default function DepartmentList({departments, selectDepartment, deleteDepartment}: Props) {
    return ( //video 5.7
        <Segment>
            <Item.Group divided>
                {departments.map(department => (
                    <Item key={department.id}>
                        <Item.Content> 
                            <Item.Header as='a'>{department.departmentName}</Item.Header>
                            <Item.Extra>
                                <Button onClick={() => selectDepartment(department.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteDepartment(department.id)} floated='right' content='Delete' color='red' />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}