import format from 'date-fns/format';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Farmacist } from '../../../app/models/farmacist';
import { useStore } from '../../../app/stores/store';

interface Props {
    farmacist: Farmacist
}

export default function FarmacistListItem({farmacist}: Props) {
    const {farmacistStore} = useStore();
    const{deleteFarmacist,  loading,} = farmacistStore;

    return (
       <Segment.Group>
           
           <Segment>
          
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/farmacistImages/F.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/farmacists/${farmacist.id}`}>
                                {farmacist.emri}
                            </Item.Header>
                            <Item.Description>Pershkrimi i farmacistit</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
                   <Icon name='calendar'/> {format(farmacist.dateOfJoining!, 'dd MMM yyyy')}
               </span>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/farmacists/${farmacist.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
                   <Button onClick={() => deleteFarmacist(farmacist.id)} type='submit' color='red' disabled={loading} >Delete</Button>

           </Segment>
       </Segment.Group>
    )
}


