import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Country } from '../../../app/models/country';
import { useStore } from '../../../app/stores/store';

const countryImageStyle = {
    filter: 'brightness(30%)'
};

const countryImageTextStyle = {
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

export default observer (function CountryDetailedHeader({country}: Props) {
    const {countryStore: {loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/countryImages/${country.countryName}.png`} fluid style={countryImageStyle}/>
                <Segment style={countryImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={country.countryName}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {country.capital}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/countries' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managecountry/${country.id}`} color='orange' floated='right'>
                    Manage Country
                </Button>
            </Segment>
        </Segment.Group>
    )
})