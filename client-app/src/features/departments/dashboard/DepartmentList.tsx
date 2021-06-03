import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';

interface Props {
    departments: Department[];
    selectDepartment: (id: string) => void;
    deleteDepartment: (id: string) => void;
    submitting: boolean;
}

export default function DepartmentList({departments, selectDepartment, deleteDepartment, submitting}: Props) {
    const [target, setTarget] = useState('');

    function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDepartment(id);
    }

    return ( //video 5.7
        <Segment>
            <Item.Group divided>
                {departments.map(department => (
                    <Item key={department.id}>
                        <Item.Content> 
                            <Item.Header as='a'>{department.departmentName}</Item.Header>
                            <Item.Extra>
                                <Button onClick={() => selectDepartment(department.id)} floated='right' content='View' color='blue' />
                                <Button 
                                    name={department.id}
                                    loading={submitting && target === department.id} 
                                    onClick={(e) => handleDepartmentDelete(e, department.id)} 
                                    floated='right' 
                                    content='Delete' 
                                    color='red'
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
}