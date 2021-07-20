import { format } from 'date-fns';
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
                        <Icon size='large' color='teal'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <p>{country.countryName}</p>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='info' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Kqyeqyteti: {country.capital} <br/> Popullesia: {country.population},<br/> Area: {country.area}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='marker' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Latitude Longitude: {country.latLong}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='currency' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Currency: {country.currency}</span>
                    </Grid.Column>
                </Grid>
            </Segment> 
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='time' size='large' color='teal' />
                    </Grid.Column>
                    <Grid.Column width={11}>
                        <span>Time Zone: {country.timeZone}</span>
                    </Grid.Column>
                </Grid>
            </Segment> 
        </Segment.Group>
    )
})