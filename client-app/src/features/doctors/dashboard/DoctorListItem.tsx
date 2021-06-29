import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import React from 'react';
import { Doctor } from "../../../app/models/doctor";

interface Props {
    doctor : Doctor
}

export default function DoctorListItem({doctor}: Props){


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/doctors/${doctor.id}`} >
                                {doctor.name}
                            </Item.Header>
                            <Item.Description>Hosted By Erza</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name='clock' /> {doctor.dateofbirth}
                    <Icon  marker='marker'/>{doctor.gender}
                </span>
            </Segment>
            <Segment secondary>
                Attendies go here
            </Segment>
            <Segment clearing>
                <span>{doctor.designation}</span>
                <Button 
                    as={Link}
                    to={`/doctors/${doctor.id}`}
                    color='teal'
                    floated= 'right'
                    content= 'View'
                />
            </Segment>
        </Segment.Group>
    )
}