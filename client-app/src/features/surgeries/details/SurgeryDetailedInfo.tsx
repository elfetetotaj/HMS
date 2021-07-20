import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Surgery } from "../../../app/models/surgery";

interface Props {
    surgery: Surgery;
}

export default observer(function SurgeryDetailedInfo({ surgery }: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info' />
                    </Grid.Column>
                    <Grid.Column width={15}>
                    <span>{surgery.surgeryName} <br />{surgery.description}</span> <br />
                    <span>Pacienti: {surgery.patient} <br />Doktori:{surgery.doctor}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='pencil alternate' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>{surgery.terapia}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='currency' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Pagesa: {surgery.pagesa}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})