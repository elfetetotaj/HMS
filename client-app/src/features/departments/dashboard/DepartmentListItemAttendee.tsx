import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    departmentAttendees: Profile[];
}

export default observer(function DepartmentListItemAttendee({ departmentAttendees }: Props) {
    return (
        <List horizontal>
            {departmentAttendees.map(departmentAttendee => (
                <Popup
                    hoverable
                    key={departmentAttendee.username}
                    trigger={
                        <List.Item key={departmentAttendee.username} as={Link} to={`/profiles/${departmentAttendee.username}`}>
                            <Image size="mini" circular src={departmentAttendee.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={departmentAttendee} />
                    </Popup.Content>
                </Popup>
                
            ))}
        </List>
    )
})