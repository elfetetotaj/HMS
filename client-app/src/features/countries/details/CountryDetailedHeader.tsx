import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Country } from '../../../app/models/country';
import { useStore } from '../../../app/stores/store';

const countryImageStyle = {
    filter: 'brightness(30%)'
};

const departentImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    country: Country
}

export default observer(function CountryDetailedHeader({ country }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/countryImages/${country.CountryName}.jpg`} fluid style={countryImageStyle} />
                <Segment style={departentImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={country.CountryName}
                                    style={{ color: 'white' }}
                                />
                                <p style={{ marginRight: 10 }}>
                                    {country.Location}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join </Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/managecountry/${country.Id}`} color='orange' floated='right'>
                    Manage Country
                </Button>
            </Segment>
        </Segment.Group>
    )
})