import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import React from 'react';
import { EmergencyDriver } from "../../../app/models/emergencyDriver";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

interface Props {
    emergencyDriver : EmergencyDriver
}

export default function EmergencyDriverListItem({emergencyDriver}: Props){
    const { emergencyDriverStore } = useStore();
    const { deleteEmergencyDriver, loading } = emergencyDriverStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/emergencyDriverImages/emergencyDrivers.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/emergencyDrivers/${emergencyDriver.Id}`} >
                                {emergencyDriver.Name} Xhastin
                            </Item.Header>
                            <Item.Description>EmergencyDriver in HMS</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                {/* <Icon name='clock' /> {format(emergencyDriver.Dateofbirth!, 'dd MMM yyyy h:mm aa')} */}
                    <Icon  marker='marker'/>{emergencyDriver.Gender} M
                </span>
            </Segment>
            <Segment secondary>
                Interns/Residents under your supervision
            </Segment>
            <Segment >
                {emergencyDriver.Phone}
                <Icon name="phone" />044569874
            </Segment>
            <Segment clearing>
                <span>{emergencyDriver.Department}</span>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => deleteEmergencyDriver(emergencyDriver.Id)}
                    type='submit'
                    disabled={loading}
                />
                <Button 
                    as={Link}
                    to={`/emergencyDrivers/${emergencyDriver.Id}`}
                    color='teal'
                    floated= 'right'
                    content= 'View'
                />
            </Segment>
        </Segment.Group>
    )
}