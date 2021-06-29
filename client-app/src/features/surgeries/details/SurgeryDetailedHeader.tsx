import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Surgery } from '../../../app/models/surgery';
import { useStore } from '../../../app/stores/store';


const surgeryImageStyle = {
    filter: 'brightness(30%)'
};

const surgeryImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    surgery: Surgery
}

export default observer (function SurgeryDetailedHeader({surgery}: Props) {
    return (
        
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
            <Image src={`/assets/surgeryImages/${surgery.Description}.jpg`} fluid style={surgeryImageStyle } />
                <Segment style={surgeryImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={surgery.SurgeryName}
                                    style={{color: 'white'}}
                                />
                                <p>
                                    {format (surgery.Date!, 'dd MMM yyyy')}
                                </p>
                                <p>
                                    Informata per operacionin
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join </Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/managesurgery/${surgery.Id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})