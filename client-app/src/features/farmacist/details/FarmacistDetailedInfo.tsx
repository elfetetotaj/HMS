import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Farmacist } from "../../../app/models/farmacist";


 interface Props {
     farmacist: Farmacist;
 }

export default observer(function FarmacistDetailedInfo({farmacist}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <p>Informata</p>
                        <p><Icon name='calendar'/>{format(farmacist.dateOfJoining!, 'dd MMM yyyy')}</p>
                        <p> Shkollimi:{farmacist.degree}</p>
                        <p> Email:{farmacist.email}</p>
                        <p> Tel:{farmacist.tel}</p>

                        {/* <p>{department.description}</p> */}
                    </Grid.Column>
                    
             
                </Grid>
            </Segment>
        </Segment.Group>
    )
})