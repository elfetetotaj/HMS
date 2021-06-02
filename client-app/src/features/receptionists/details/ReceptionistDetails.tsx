import React from 'react';
import { Button, Card } from 'semantic-ui-react';
import { Receptionist } from '../../../app/models/receptionist';

interface Props {
    receptionist: Receptionist;
    cancelSelectReceptionist: () => void;
    openForm: (id: string) => void;
}

export default function ReceptionistDetails({ receptionist, cancelSelectReceptionist, openForm }: Props) {
    return (
        <Card fluid>
            {/* <Image src={`/assets/categoryImages/${activity.category}.jpg`} /> */}
            <Card.Content>
                <Card.Header>{receptionist.username}</Card.Header>
                <Card.Meta>
                    <span>{receptionist.department}</span>
                </Card.Meta>
                <Card.Description>
                    {receptionist.id},     
                    {receptionist.name},
                    {receptionist.lastName},
                    {receptionist.username},
                    {receptionist.email},
                    {receptionist.dob},
                    {receptionist.gender},
                    {receptionist.street_address},
                    {receptionist.city},
                    {receptionist.country},
                    {receptionist.postal_code},
                    {receptionist.phone},
                    {receptionist.department}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={() => openForm(receptionist.id)} basic color='blue' content='Edit' />
                    <Button onClick={cancelSelectReceptionist} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
} 