import React from 'react';
import { Link } from 'react-router-dom';
import { Button,Icon, Item, Segment } from 'semantic-ui-react';
import { Therapy } from '../../../app/models/therapy';

interface Props {
    therapy: Therapy
}

export default function TherapyList({therapy}: Props) {

    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' src={`/assets/therapyImages/therapy.png`} />
                       <Item.Content>
                            <Item.Header as={Link} to={`/therapies/${therapy.id}`}>
                                {therapy.id}
                            </Item.Header>
                            <Item.Description>{therapy.Pershkrimi}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/therapies/${therapy.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}