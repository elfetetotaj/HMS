import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Therapy} from "../../../app/models/therapy";

interface Props {
    therapy: Therapy
}

export default observer(function TherapyDetailedInfo({therapy}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{therapy.pershkrimi}</p>
                        <p>Doktori: {therapy.doctor}</p>
                        <p>Pacienti: {therapy.patient}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})