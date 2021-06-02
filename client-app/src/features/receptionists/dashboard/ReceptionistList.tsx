import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Receptionist } from '../../../app/models/receptionist';

interface Props {
    receptionists: Receptionist[];
    selectReceptionist: (id: string) => void;
    deleteReceptionist: (id: string) => void;
}

export default function ReceptionistList({ receptionists, selectReceptionist, deleteReceptionist }: Props) {
    return (
        <Segment>
            <Item.Group divided>
                {receptionists.map(receptionist => (
                    <Item key={receptionist.id}>
                        <Item.Content>
                            <Item.Header as='a'>{receptionist.username}</Item.Header>
                            <Item.Meta>{receptionist.dob}</Item.Meta>
                            <Item.Description>
                                <div>{receptionist.name}, {receptionist.lastName}</div>
                                <div>{receptionist.city}, {receptionist.country} , {receptionist.department}</div>
                                <div>{receptionist.email}, {receptionist.gender}, {receptionist.street_address}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => selectReceptionist(receptionist.id)} floated='right' content='View' color='blue' />
                                <Button onClick={() => deleteReceptionist(receptionist.id)} floated='right' content='Delete' color='red' />
                                <Label basic content={receptionist.department} />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    )
} 