import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import React from 'react';
import { Doctor } from "../../../app/models/doctor";
import { format } from "date-fns";
import { useStore } from "../../../app/stores/store";

interface Props {
    doctor : Doctor
}

export default function DoctorListItem({doctor}: Props){
    const {doctorStore} = useStore();
    const{deleteDoctor,  loading} = doctorStore;

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/doctor.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/doctors/${doctor.id}`} >
                                {doctor.name}
                            </Item.Header>
                            <Item.Description>Doctor in HMS</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                <Icon name='clock' /> {format(doctor.dateofbirth!, 'dd MMM yyyy h:mm aa')}
                    <Icon  marker='marker'/>{doctor.gender}
                </span>
            </Segment>
            <Segment secondary>
                Interns/Residents under your supervision
            </Segment>
            <Segment clearing>
              
                <Button 
                    as={Link}
                    to={`/doctors/${doctor.id}`}
                    color='teal'
                    floated= 'right'
                    content= 'View'
                />
                   <Button  onClick={() => deleteDoctor(doctor.id)} type='submit'  color='red' disabled={loading} content='Delete'/>

            </Segment>
        </Segment.Group>
    )
}