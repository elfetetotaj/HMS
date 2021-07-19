import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../profiles/ProfileCard';

interface Props {
    cityAttendees: Profile[];
}

export default observer(function CityListItemAttendee({ cityAttendees }: Props) {
    return (
        <List horizontal>
            {cityAttendees.map(cityAttendee => (
                <Popup
                    hoverable
                    key={cityAttendee.username}
                    trigger={
                        <List.Item key={cityAttendee.username} as={Link} to={`/profiles/${cityAttendee.username}`}>
                            <Image size="mini" circular src={cityAttendee.image || '/assets/user.png'} />
                        </List.Item>
                    }
                >
                    <Popup.Content>
                        <ProfileCard profile={cityAttendee} />
                    </Popup.Content>
                </Popup>
            ))}
            <List.Item>
                {cityAttendees.length} {cityAttendees.length === 1 ? 'Doctor' : 'Doctors'} in this Department
            </List.Item>
        </List>
    )
})