import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Icon, Item, Segment } from 'semantic-ui-react';
import { Country } from '../../../app/models/country';
import { useStore } from '../../../app/stores/store';

interface Props {
    country: Country;
}

export default function CountryListItem({ country }: Props) {
    const { countryStore } = useStore();
    const { deleteCountry, loading } = countryStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={`/assets/countryImages/${country.countryName}.png`} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/countries/${country.id}`}>
                                {country.countryName}
                            </Item.Header>
                            <Item.Description>{country.capital}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='marker' /> Latitude Longitude: {country.latLong}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon name='currency' /> Currency: {country.currency}
                </span>
            </Segment>
            <Segment>
                <span>
                    <Icon name='time' /> Time Zone: {country.timeZone}
                </span>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => {if(window.confirm('Are you sure?')){deleteCountry(country.id)};}} 
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/countries/${country.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}



