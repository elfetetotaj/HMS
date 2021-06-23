import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react';
import { Nurse}  from '../../../app/models/nurse';
// import {Department} from "../../../app/models/department";

// interface Props {
//     department: Department
// }

export default observer(function NurseDetailedInfo(/*{department}: Props*/) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Pershkrimi i infermierit/s</p>
                        <p> {format (nurse.datelindja!, 'dd MMM yyyy')}</p>
                        {/* <p>{department.description}</p> */}
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})