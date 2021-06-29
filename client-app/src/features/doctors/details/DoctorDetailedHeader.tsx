import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Doctor } from '../../../app/models/doctor';

const doctorImageStyle = {
    filter: 'brightness(30%)'
};

const doctorImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    doctor: Doctor
}

export default observer (function DoctorDetailedHeader({doctor: Doctor}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/user.png`} fluid style={doctorImageStyle}/>
                <Segment style={doctorImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={Doctor.name}
                                    style={{color: 'white'}}
                                />
                                <p>{Doctor.dateofbirth}</p>
                                <p>
                                    Hosted by <strong>Erza</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})