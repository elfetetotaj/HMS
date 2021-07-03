import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
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
                                <p>{format(Doctor.dateofbirth!, 'dd MMM yyyy')}</p>
                                <p>
                                    Doctor in <strong>HMS</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/doctors' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managedoctor/${Doctor.id}`} color='orange' floated='right'>
                    Manage Doctor
                </Button>
            </Segment>
        </Segment.Group>
    )
})