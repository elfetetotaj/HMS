import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { City } from '../../../app/models/city';

interface Props {
    city: City
}

export default function FarmacistListItem({city}: Props) {

    return (
       <Segment.Group>

           <Segment>

               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/cities/${city.Id}`}>
                                {city.cityName}
                            </Item.Header>
                            <Item.Description>Zip Kodi</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
               <Icon name='marker' /> {city.zipCode}
               </span>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/cities/${city.Id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
} 