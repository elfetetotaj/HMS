import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Surgery } from '../../../app/models/surgery';

interface Props {
    surgery: Surgery
}

export default function SurgeryListItem({surgery}: Props) {

    return (
       <Segment.Group>
           
           <Segment>
           <p> {surgery.SurgeryName}</p>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/surgeries/${surgery.Id}`}>
                                {surgery.SurgeryName}
                            </Item.Header>
                            <Item.Description>Pershkrim i operacionit</Item.Description>
                                {surgery.Description}
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
                   {/* <Icon name='calendar'/> {format(surgery.Date!, 'dd MMM yyyy')} */}
                   <br/>
                   <Icon name='map marker' />{surgery.Terapia}
               </span>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/surgeries/${surgery.Id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}