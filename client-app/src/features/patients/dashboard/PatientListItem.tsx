import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Patient } from "../../../app/models/patient";
import React from 'react';
import {format} from 'date-fns';

interface Props {
    patient : Patient
}

export default function PatientListItem({patient}: Props){


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/patients/${patient.id}`} >
                                {patient.name}
                            </Item.Header>
                            <Item.Description>Hosted By HMS</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {format(patient.register_date!, 'dd MMM yyyy h:mm aa')}
                    <Icon  marker='marker'/>{patient.gender}
                </span>
            </Segment>
            <Segment secondary>
                Attendies go here/Doctors in the case
            </Segment>
            <Segment clearing>
                <span>{patient.other_det}</span>
                <Button 
                    as={Link}
                    to={`/patients/${patient.id}`}
                    color='teal'
                    floated= 'right'
                    content= 'View'
                />
            </Segment>
        </Segment.Group>
    )
}