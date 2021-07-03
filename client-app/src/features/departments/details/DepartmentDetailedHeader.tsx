import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Department } from '../../../app/models/department';
import { useStore } from '../../../app/stores/store';

const departmentImageStyle = {
    filter: 'brightness(30%)'
};

const departmentImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '2%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    department: Department
}

export default observer (function DepartmentDetailedHeader({department}: Props) {
    const {departmentStore: {updateAttendance, loading}} = useStore();
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/departmentImages/${department.departmentName}.jpg`} fluid style={departmentImageStyle}/>
                <Segment style={departmentImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={department.departmentName}
                                    style={{color: 'white'}}
                                />
                                <p style={{marginRight: 10}}>
                                    {department.departmentDescription}
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {department.isHost ? (
                    <Button as={Link} to={`/managedepartment/${department.id}`} color='orange' floated='right'>
                        Manage Event
                    </Button>
                ) : department.isDoctor ? (
                    <Button loading={loading} onClick={updateAttendance}>Cancel attendance</Button>
                ) : (
                    <Button loading={loading} onClick={updateAttendance} color='teal'>Join Activity</Button>
                )}
            </Segment>
        </Segment.Group>
    )
})