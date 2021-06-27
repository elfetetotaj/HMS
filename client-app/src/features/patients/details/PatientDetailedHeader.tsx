import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Patient } from '../../../app/models/Patient';

const patientImageStyle = {
    filter: 'brightness(30%)'
};

const patientImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    patient: Patient
}

export default observer (function PatientDetailedHeader({patient: Patient}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/user.png`} fluid style={patientImageStyle}/>
                <Segment style={patientImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={Patient.name}
                                    style={{color: 'white'}}
                                />
                                <p>{Patient.dateofbirth}</p>
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