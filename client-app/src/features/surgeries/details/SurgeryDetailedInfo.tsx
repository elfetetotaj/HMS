import { format } from 'date-fns';
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Surgery } from "../../../app/models/surgery";

 interface Props {
     surgery: Surgery;
 }

export default observer(function SurgeryDetailedInfo({surgery}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Pershkrimi i operacionit</p>
                        <p><Icon name='calendar'/>{format(surgery.Date!, 'dd MMM yyyy')}</p>
                        <p> <Icon name='map marker' />{surgery.Description}</p>
                    </Grid.Column>
                    
             
                </Grid>
            </Segment>
        </Segment.Group>
    )
})