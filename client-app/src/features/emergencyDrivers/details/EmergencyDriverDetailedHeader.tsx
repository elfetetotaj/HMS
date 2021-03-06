import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { EmergencyDriver } from '../../../app/models/emergencyDriver';
import { useStore } from '../../../app/stores/store';

const emergencyDriverImageStyle = {
    filter: 'brightness(30%)'
};

const emergencyDriverImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    emergencyDriver: EmergencyDriver
}

export default observer (function EmergencyDriverDetailedHeader({emergencyDriver}: Props) {
    const {emergencyDriverStore: {loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/emergencyDriverImages/EmergencyDriver.png`} fluid style={emergencyDriverImageStyle}/>
                <Segment style={emergencyDriverImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={emergencyDriver.name}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {emergencyDriver.department}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/emergencyDrivers' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/manageemergencyDriver/${emergencyDriver.id}`} color='orange' floated='right'>
                    Manage EmergencyDriver
                </Button>
            </Segment>
        </Segment.Group>
    )
})