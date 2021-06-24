import format from 'date-fns/format';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Nurse } from '../../../app/models/nurse';

interface Props {
    nurse: Nurse
}

export default function NurseListItem({nurse}: Props) {

    return (
       <Segment.Group>
           
           <Segment>
           <p> {nurse.username}</p>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/nurses/${nurse.id}`}>
                                {nurse.emri}
                            </Item.Header>
                            <Item.Description>Pershkrim i infermierit/es</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
                   <Icon name='calendar'/> {format(nurse.datelindja!, 'dd MMM yyyy')}
                   <br/>
                   <Icon name='map marker' />{nurse.adresa}
               </span>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/nurses/${nurse.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}