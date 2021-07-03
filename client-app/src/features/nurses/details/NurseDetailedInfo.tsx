import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Nurse } from "../../../app/models/nurse";
// import {Department} from "../../../app/models/department";

 interface Props {
     nurse: Nurse;
 }

export default observer(function NurseDetailedInfo({nurse}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Informata</p>
                        <p><Icon name='calendar'/>{format(nurse.datelindja!, 'dd MMM yyyy')}</p>
                        <p> <Icon name='map marker' />{nurse.adresa}</p>
                        <p>Departamenti: {nurse.department}</p>
                        <p>Qyteti: {nurse.qyteti}</p>
                        <p>Email: {nurse.email}</p>
                        <p>Paga {nurse.paga}</p>


                        {/* <p>{department.description}</p> */}
                    </Grid.Column>
                    
             
                </Grid>
            </Segment>
        </Segment.Group>
    )
})