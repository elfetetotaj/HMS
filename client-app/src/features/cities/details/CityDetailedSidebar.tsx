import React from 'react'
import { Segment, List, Label, Item, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import { Department } from '../../../app/models/department'

interface Props {
    department: Department;
}

export default observer(function CityDetailedSidebar({ department: {departmentAttendees, host} }: Props) {
    if (!departmentAttendees) return null;
    return (
        <>
            <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
            >
                {departmentAttendees.length} {departmentAttendees.length === 1 ? 'Doctor' : 'Doctors'} in this Department
            </Segment>
            <Segment attached>
                <List relaxed divided>
                    {departmentAttendees.map(departmentAttendee => (
                        <Item style={{ position: 'relative' }} key={departmentAttendee.username} >
                            {departmentAttendee.username === host?.username &&
                            <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right'
                                
                            >
                                Shef i departamentit
                            </Label>}
                            <Image size='tiny' src={departmentAttendee.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Item.Header as='h3'>
                                    <Link to={`/profiles/${departmentAttendee.username}`}>{departmentAttendee.displayName}</Link>
                                </Item.Header>
                                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                            </Item.Content>
                        </Item>
                    ))}
                </List>
            </Segment>
        </>

    )
})