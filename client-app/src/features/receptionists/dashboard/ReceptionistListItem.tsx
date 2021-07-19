import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Modal, Segment } from 'semantic-ui-react';
import { Receptionist } from '../../../app/models/receptionist';
import { useStore } from '../../../app/stores/store';
// import {format} from 'date-fns';

interface Props {
    receptionist: Receptionist
}

export default function ReceptionistListItem({ receptionist }: Props) {

    const { receptionistStore } = useStore();
    const { deleteReceptionist, loading } = receptionistStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src={`/assets/receptionistImages/${receptionist.name}.png`} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/receptionists/${receptionist.id}`}>
                                {receptionist.name}__{receptionist.lastName}
                            </Item.Header>
                            <Item.Description>Recepcionist
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {receptionist.dob} <br />
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon name='marker' /> {receptionist.department}
                </span>
            </Segment>
            <Segment>
                <Icon name='phone' /> {receptionist.phone}
            </Segment>
            <Segment>
                <span>Departamenti: {receptionist.department}</span>
            </Segment>
            <Segment clearing>
            <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => {if(window.confirm('Are you sure?')){deleteReceptionist(receptionist.id)};}} 
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/receptionists/${receptionist.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />

            </Segment>
        </Segment.Group >
    )
}