import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EmergencyDriverListItem from './EmergencyDriverListItem';


export default observer(function EmergencyDriverList() {
    const { emergencyDriverStore } = useStore();
    const { emergencyDriversByDate } = emergencyDriverStore;

    return (
        <Segment>
            <Item.Group divided>
                {emergencyDriversByDate.map(emergencyDriver => (
                    <EmergencyDriverListItem key={emergencyDriver.id} emergencyDriver={emergencyDriver} />
                ))}

            </Item.Group>
        </Segment>

    )
})