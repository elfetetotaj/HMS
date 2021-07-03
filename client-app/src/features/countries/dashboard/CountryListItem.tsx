import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Country } from '../../../app/models/country';
import { useStore } from '../../../app/stores/store';

interface Props {
    country: Country;
}

export default function CountryListItem({country}: Props) {
    const { countryStore } = useStore();
    const { deleteCountry, loading } = countryStore;
    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                   <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/countries/${country.Id}`}>
                                {country.CountryName}
                            </Item.Header>
                            <Item.Description>{country.Population}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
           <span>
                    <Icon name='marker' /> {country.Goverment}
                </span>
           </Segment>
           <Segment clearing>
           <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => deleteCountry(country.Id)}
                    type='submit'
                    disabled={loading}
                />
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