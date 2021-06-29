import format from 'date-fns/format';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { TechEmployee } from '../../../app/models/techEmployee';

interface Props {
    techEmployee: TechEmployee
}

export default function TechEmployeeListItem({techEmployee}: Props) {

    return (
       <Segment.Group>
           
           <Segment>
           <p> {techEmployee.username}</p>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/techEmployees/${techEmployee.id}`}>
                                {techEmployee.emri}
                            </Item.Header>
                            <Item.Description>Pershkrim i infermierit/es</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
                   <Icon name='calendar'/> {format(techEmployee.datelindja!, 'dd MMM yyyy')}
                   <br/>
                   <Icon name='map marker' />{techEmployee.adresa}
               </span>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/techEmployees/${techEmployee.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}