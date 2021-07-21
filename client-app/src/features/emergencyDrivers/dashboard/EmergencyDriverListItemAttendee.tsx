import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    emergencyDriverAttendees: Profile[];
}

export default observer(function EmergencyDriverListItemAttendee({ emergencyDriverAttendees }: Props) {
    return (
        <List horizontal>
            {emergencyDriverAttendees.map(emergencyDriverAttendee => (
                <Popup
                    hoverable
                    key={emergencyDriverAttendee.username}
                    trigger={
                        <List.Item key={emergencyDriverAttendee.username} as={Link} to={`/profiles/${emergencyDriverAttendee.username}`}>
                            <Image size="mini" circular src={emergencyDriverAttendee.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={emergencyDriverAttendee} />
                    </Popup.Content>
                </Popup>
            ))}
            <List.Item>
                {emergencyDriverAttendees.length} {emergencyDriverAttendees.length === 1 ? 'Doctor' : 'Doctors'} in this Department
            </List.Item>
        </List>
    )
})