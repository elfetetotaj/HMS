import { observer } from 'mobx-react-lite';
import React from 'react'
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { City } from "../../../app/models/city";


 interface Props {
     city: City;
 }

export default observer(function CityDetailedInfo({city}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>Pershkrimi i qytetit</p>
                        <p> <Icon  />{city.zipCode}</p>
                    </Grid.Column>


                </Grid>
            </Segment>
        </Segment.Group>
    )
}) 