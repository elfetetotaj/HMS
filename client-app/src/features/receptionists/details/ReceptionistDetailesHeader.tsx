import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Receptionist } from "../../../app/models/receptionist";
import { format } from 'date-fns';

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

export default observer(function ReceptionistDetailedHeader({ receptionist }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/receptionistImages/${receptionist.name}.png`} fluid style={receptionistImageStyle} />
                <Segment style={receptionistImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={receptionist.name}
                                    style={{ color: 'white' }}
                                />
                                <p>{receptionist.dob}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/receptionists' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managereceptionist/${receptionist.id}`} color='orange' floated='right'>
                    Manage Receptionist
                </Button>
            </Segment>
        </Segment.Group>
    )
})