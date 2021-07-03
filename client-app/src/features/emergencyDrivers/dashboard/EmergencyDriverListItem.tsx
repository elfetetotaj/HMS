import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import React from 'react';
import { EmergencyDriver } from "../../../app/models/emergencyDriver";
import { format } from "date-fns";

interface Props {
    emergencyDriver : EmergencyDriver
}

export default function EmergencyDriverListItem({emergencyDriver}: Props){


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/emergencyDrivers/${emergencyDriver.Id}`} >
                                {emergencyDriver.Name}
                            </Item.Header>
                            <Item.Description>EmergencyDriver in HMS</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                {/* <Icon name='clock' /> {format(emergencyDriver.Dateofbirth!, 'dd MMM yyyy h:mm aa')} */}
                    <Icon  marker='marker'/>{emergencyDriver.Gender}
                </span>
            </Segment>
            <Segment secondary>
                Interns/Residents under your supervision
            </Segment>
            <Segment clearing>
                <span>{emergencyDriver.Department}</span>
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