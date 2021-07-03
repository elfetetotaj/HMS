import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import React from 'react';
import {format} from 'date-fns';
import { Room } from "../../../app/models/room";

interface Props {
    room : Room
}

export default function RoomListItem({room}: Props){


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/rooms/${room.id}`} >
                                {room.type},
                               Floor {room.floor_no}
                            </Item.Header>
                            <Item.Description>Hosted By HMS</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon  marker='marker'/>{room.stauts}
                </span>
            </Segment>
            <Segment secondary>
                Attendies go here/Patients in the room
            </Segment>
            <Segment clearing>
                <span>Total Beds Occupied {room.total_bed_occupied}</span>
                <Button 
                    as={Link}
                    to={`/rooms/${room.id}`}
                    color='teal'
                    floated= 'right'
                    content= 'View'
                />
            </Segment>
        </Segment.Group>
    )
}