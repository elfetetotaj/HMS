import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default observer(function DepartmentList() {
    const {departmentStore} = useStore();
    const {deleteDepartment, departmentsByDate, loading} = departmentStore

    const [target, setTarget] = useState('');

    function handleDepartmentDelete(e: SyntheticEvent<HTMLButtonElement>, id: string) {
        setTarget(e.currentTarget.name);
        deleteDepartment(id);
    }


    return ( //video 5.7
        <Segment>
            <Item.Group divided>
                {departmentsByDate.map(department => (
                    <Item key={department.id}>
                        <Item.Content> 
                            <Item.Header as='a'>{department.departmentName}</Item.Header>
                            <Item.Extra>
                                <Button as={Link} to={`/departments/${department.id}`} floated='right' content='View' color='blue' />
                                <Button 
                                    name={department.id}
                                    loading={loading && target === department.id} 
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
})