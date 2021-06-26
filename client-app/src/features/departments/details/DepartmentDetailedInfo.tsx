import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Department} from "../../../app/models/department";

interface Props {
    department: Department
}

export default observer(function DepartmentDetailedInfo({department}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{department.departmentDescription}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})