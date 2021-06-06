import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default observer (function ReceptionistDetails() {

    const {receptionistStore} = useStore();
    const {selectedReceptionist: receptionist, loadReceptionist, loadingInitial} = receptionistStore;
    const {id} = useParams<{id: string}>();

    useEffect(() => {
        if (id) loadReceptionist(id);
    },[id, loadReceptionist]);

    if (loadingInitial || !receptionist ) return <LoadingComponent />;

    return (
        <Card fluid>
             {/* <Image src={`/assets/departmentImages/${department.departmentName}.jpg`} /> */}
            <Card.Content>
                <Card.Header>{receptionist.username}</Card.Header>
                <Card.Meta>
                    <span>{receptionist.department}</span>
                </Card.Meta>
                <Card.Description>
                    <div>{receptionist.name}, {receptionist.lastName}</div>
                    <div>{receptionist.city}, {receptionist.country} , {receptionist.department}</div>
                    <div>{receptionist.email}, {receptionist.gender}, {receptionist.street_address}</div>
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button as={Link} to={`/manage/${receptionist.id}`} basic color='blue' content='Edit' />
                    <Button as={Link} to={'/receptionists'} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
} )