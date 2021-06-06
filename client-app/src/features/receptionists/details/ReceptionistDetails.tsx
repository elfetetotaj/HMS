import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

export default function ReceptionistDetails() {

    const {receptionistStore} = useStore();
    const {selectedReceptionist: receptionist, openForm, cancelSelectedReceptionist} = receptionistStore;

    if (!receptionist) return <LoadingComponent />;

    return (
        <Card fluid>
            {/* <Image src={`/assets/categoryImages/${activity.category}.jpg`} /> */}
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
                    <Button onClick={() => openForm(receptionist.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectedReceptionist} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
} 