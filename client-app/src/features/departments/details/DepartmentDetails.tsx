import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer(function DepartmentDetails() {
    const {departmentStore} = useStore();
    const {selectedDepartment: department, loadDepartment, loadingInitial} = departmentStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadDepartment(id);
    }, [id, loadDepartment]);

    if (loadingInitial || !department) return <LoadingComponent />;

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
                    <Button as={Link} to={`/managedepartment/${department.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to='/departments' basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
})