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
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    surgery: Surgery
}

export default observer (function SurgeryDetailedHeader({surgery}: Props) {
    const {surgeryStore: {loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/surgeryImages/surgeryImg.png`} fluid style={surgeryImageStyle}/>
                <Segment style={surgeryImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={surgery.surgeryName}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {surgery.terapia}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/surgeries' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managesurgery/${surgery.id}`} color='orange' floated='right'>
                    Manage Surgery
                </Button>
            </Segment>
        </Segment.Group>
    )
})