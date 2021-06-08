import { observer } from 'mobx-react-lite';
import React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Nurse } from '../../../app/models/nurse';

const nurseImageStyle = {
    filter: 'brightness(30%)'
};

const nurseImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    nurse: Nurse
}

export default observer (function NurseDetailedHeader({nurse}: Props) {
    return (
        
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
            <Image src={`/assets/nursesImages/${nurse.emri}.jpg`} fluid style={nurseImageStyle } />
                <Segment style={nurseImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={nurse.emri}
                                    style={{color: 'white'}}
                                />
                                <p>
                                    Informata per infermieren
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