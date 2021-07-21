import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { EmergencyDriver } from '../../../app/models/emergencyDriver';

interface Props {
    emergencyDriver: EmergencyDriver
}

export default observer(function EmergencyDriverDetailedInfo({ emergencyDriver }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{emergencyDriver.name} __ {emergencyDriver.surname}</p>
                        <p>{emergencyDriver.department}</p>
                        <p>{emergencyDriver.gender}</p>
                        <p>{emergencyDriver.phone}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>{emergencyDriver.dateofbirth}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{emergencyDriver.street_address}, {emergencyDriver.city}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})