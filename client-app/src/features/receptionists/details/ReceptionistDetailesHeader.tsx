import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Receptionist} from "../../../app/models/receptionist";
import {format} from 'date-fns';

const receptionistImageStyle = {
    filter: 'brightness(30%)'
};

const receptionistImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    receptionist: Receptionist
}

export default observer (function ReceptionistDetailedHeader({receptionist}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${receptionist.city}.jpg`} fluid style={receptionistImageStyle}/>
                <Segment style={receptionistImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={receptionist.name}
                                    style={{color: 'white'}}
                                />
                                <p>{receptionist.dob}</p> 
                                <p>{format(receptionist.dob!, 'dd MMM yyyy')}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${receptionist.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
}) 