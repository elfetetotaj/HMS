import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { City } from '../../../app/models/city';
import { useStore } from '../../../app/stores/store';

const cityImageStyle = {
    filter: 'brightness(30%)'
};

const cityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    city: City
}

export default observer (function CityDetailedHeader({city}: Props) {
    const {cityStore: {loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/cityImages/${city.cityName}.png`} fluid style={cityImageStyle}/>
                <Segment style={cityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={city.cityName}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {city.zipCode}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/cities' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managecity/${city.id}`} color='orange' floated='right'>
                    Manage City
                </Button>
            </Segment>
        </Segment.Group>
    )
})