import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { City } from '../../../app/models/city';
import { useStore } from '../../../app/stores/store';

interface Props {
    city: City;
}

export default function CityListItem({ city }: Props) {
    const { cityStore } = useStore();
    const { deleteCity, loading } = cityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' src={`/assets/cityImages/${city.cityName}.png`} />
                        <Item.Content>
                            <Item.Header as={Link} to={`/cities/${city.id}`}>
                                {city.cityName}
                            </Item.Header>
                            <Item.Description>{city.zipCode}</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => {if(window.confirm('Are you sure?')){deleteCity(city.id)};}} 
                    type='submit'
                    disabled={loading}
                />
                <Button
                    as={Link}
                    to={`/cities/${city.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
    )
}



