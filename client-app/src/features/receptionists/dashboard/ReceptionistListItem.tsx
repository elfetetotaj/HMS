import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Receptionist } from '../../../app/models/receptionist';
import {format} from 'date-fns';

interface Props {
    receptionist: Receptionist
}

export default function ReceptionistListItem({receptionist}: Props) {

    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/receptionists/${receptionist.id}`}>
                                {receptionist.username}
                            </Item.Header>
                            <Item.Description>Pershkrim i departmentit</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
                <span>
                    <Icon name='clock' /> {receptionist.dob}
                    <Icon name='clock' /> {format(receptionist.dob!, 'dd MMM yyyy h:mm aa')}
                    <Icon name='marker' /> {receptionist.department}
                </span>
            </Segment>
            <Segment secondary>
                Attendees go here
            </Segment>
           <Segment clearing>
           <span>{receptionist.department}</span>
               <Button 
                    as={Link}
                    to={`/receptionists/${receptionist.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}