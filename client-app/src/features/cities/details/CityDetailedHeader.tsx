import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { City } from '../../../app/models/city';

const CityImageStyle = {
    filter: 'brightness(30%)'
};

const CityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    city: City
}

export default observer (function CityDetailedHeader({city}: Props) {
    return (

        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
            <Image src={`/assets/cities/${city.cityName}.png`} fluid style={CityImageStyle } />
                <Segment style={CityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={city.cityName}
                                    style={{color: 'white'}}
                                />

                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/managecity/${city.Id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
}) 