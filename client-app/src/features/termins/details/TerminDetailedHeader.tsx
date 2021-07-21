import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image, Modal } from 'semantic-ui-react'
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

export default observer(function TerminDetailedHeader({ termin }: Props) {
    const { terminStore: { loading, deleteTermin } } = useStore();
    const [open, setOpen] = React.useState(false)
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/departmentImages/${termin.terminDepartment}.jpg`} fluid style={terminImageStyle} />
                <Segment style={terminImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={termin.terminDepartment}
                                    style={{ color: 'white' }}
                                />
                                <p style={{ marginRight: 10 }}>
                                    {termin.terminDescription}
                                </p>
                                <p>{format(termin.terminTime!, 'dd MMM yyyy')}</p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {/* <Button as={Link} to='/termins' color='orange' floated='right'>
                    Cancel
                </Button> */}
                {/* <Button
                    as={Link}
                    to='/termins'
                    color='red'
                    floated='left'
                    content='Cancel Appointment'
                    onClick={() => deleteTermin(termin.id)}
                    type='submit'
                    disabled={loading}
                /> */}
                <Modal
                    basic
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    size='small'
                    trigger={<Button color='red' >Cancel Appointment</Button>}
                >
                    <Header icon>
                        Canceling an Appointment
                    </Header>
                    <Modal.Content>
                        <p>
                            Are you sure you want to cancel this appointment? This appointment will be canceled immediately. You can’t undo this action.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='red' inverted onClick={() => deleteTermin(termin.id)} as={Link} to={`/termins`}>
                            Delete
                        </Button>
                        <Button color='grey' inverted onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                    </Modal.Actions>
                </Modal>
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