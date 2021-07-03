import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { City } from '../../../app/models/city';
import { useStore } from '../../../app/stores/store';

interface Props {
    city: City
}

export default function FarmacistListItem({ city }: Props) {
    const { cityStore } = useStore();
    const { deleteCity, loading } = cityStore;
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/cityImages/Prizren.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/cityImages/${city.Id}`}>
                                {city.CityName} 
                            </Item.Header>
                            <Item.Description>City</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='marker' /> {city.ZipCode}
                </span>
            </Segment>
            <Segment clearing>
                <Button
                    as={Link}
                    to={`#`}
                    color='red'
                    floated='right'
                    content='Delete'
                    onClick={() => deleteCity(city.Id)}
                    type='submit'
                    disabled={loading}
                />
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