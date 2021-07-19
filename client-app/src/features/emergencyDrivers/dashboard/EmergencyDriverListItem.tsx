import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { EmergencyDriver } from '../../../app/models/emergencyDriver';
import { useStore } from '../../../app/stores/store';

interface Props {
    emergencyDriver: EmergencyDriver;
}

export default function EmergencyDriverListItem({ emergencyDriver }: Props) {
    const { emergencyDriverStore } = useStore();
    const { deleteEmergencyDriver, loading } = emergencyDriverStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={`/assets/emergencyDriverImages/EmergencyDriver.png`} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/emergencyDrivers/${emergencyDriver.id}`}>
                                {emergencyDriver.name}__{emergencyDriver.surname}
                            </Item.Header>
                            <Item.Description>EmergencyDriver in HMS</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name="info"/>{emergencyDriver.department}
            </Segment>
            <Segment >
                <Icon name="phone" />{emergencyDriver.phone}
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => {if(window.confirm('Are you sure?')){deleteEmergencyDriver(emergencyDriver.id)};}} 
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/emergencyDrivers/${emergencyDriver.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}