import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Patient } from "../../../app/models/patient";
import React from 'react';
import {format} from 'date-fns';
import { useStore } from "../../../app/stores/store";

interface Props {
    patient : Patient
}

export default function PatientListItem({patient}: Props){
    const {patientStore} = useStore();
    const{deletePatient,  loading,} = patientStore;


    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/patient.png' />
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
             
                <Button 
                    as={Link}
                    to={`/patients/${patient.id}`}
                    color='teal'
                    floated= 'right'
                    content= 'View'
                />
                   <Button  onClick={() => deletePatient(patient.id)} type='submit'  color='red' disabled={loading} content='Delete'/>

            </Segment>
        </Segment.Group>
    )
}