import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Therapy } from '../../../app/models/therapy';

const therapyImageStyle = {
    filter: 'brightness(30%)'
};

const therapyImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    therapy: Therapy
}

export default observer(function TherapyDetailedHeader({ therapy }: Props) {

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/therapyImages/therapy1.png`} fluid style={therapyImageStyle} />
                <Segment style={therapyImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={therapy.therapyName}
                                    style={{ color: 'white' }}
                                />
                                <p style={{ marginRight: 10 }}>
                                    {therapy.pershkrimi}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/therapies' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managetherapy/${therapy.id}`} color='orange' floated='right'>
                    Manage Therapy
                </Button>
            </Segment>
        </Segment.Group>
    )
})