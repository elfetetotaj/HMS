import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Termin } from '../../../app/models/termin';
import { useStore } from '../../../app/stores/store';

const terminImageStyle = {
    filter: 'brightness(30%)'
};

const terminImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    termin: Termin
}

export default observer (function TerminDetailedHeader({termin}: Props) {
    const {terminStore: {loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/departmentImages/${termin.terminDepartment}.jpg`} fluid style={terminImageStyle}/>
                <Segment style={terminImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={termin.terminDepartment}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {termin.terminDescription}
                                </p>
                                <p>{format(termin.terminTime!, 'dd MMM yyyy')}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button as={Link} to='/termins' color='orange' floated='right'>
                    Cancel
                </Button>
                <Button as={Link} to={`/managetermin/${termin.id}`} color='orange' floated='right'>
                    Manage Appointment
                </Button>
            </Segment>
            {/* <Segment clearing attached='bottom'>
                {department.isHost ? (
                    <Button as={Link} to={`/managedepartment/${department.id}`} color='orange' floated='right'>
                        Manage Event
                    </Button>
                ) : department.isDoctor ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                    <Button loading={loading} onClick={updateAttendance} color='teal'>Join Activity</Button>
                )}
            </Segment> */}
        </Segment.Group>
    )
})