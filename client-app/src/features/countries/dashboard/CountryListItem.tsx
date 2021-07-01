import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Country } from '../../../app/models/country';

interface Props {
    country: Country;
}

export default function CountryListItem({country}: Props) {

    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       {/* <Item.Image size='tiny' src={`/assets/countryImages/${country.CountryName}.jpg`} /> */}
                       <Item.Content>
                            <Item.Header as={Link} to={`/countries/${country.Id}`}>
                                {country.CountryName}
                            </Item.Header>
                            <Item.Description>{country.Population}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment secondary>
               {/* <CountryListItemAttendee countryAttendees={country.countryAttendees!} /> */}
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/countries/${country.Id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}