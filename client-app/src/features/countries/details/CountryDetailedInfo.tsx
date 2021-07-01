import { observer } from 'mobx-react-lite';
import React from 'react'
import {Segment, Grid, Icon} from 'semantic-ui-react'
import {Country} from "../../../app/models/country";

interface Props {
    country: Country
}

export default observer(function CountryDetailedInfo({country}: Props) {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' color='teal' name='info'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{country.CountryName}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
})