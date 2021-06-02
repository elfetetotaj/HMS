import React from 'react';
import { Button, Item, Label, Segment } from 'semantic-ui-react';
import { Patient } from '../../../app/models/Patient';

interface Props{
    patientinfo : Patient[];
}

export default function PatientList({patientinfo}: Props){
    return (
        <Segment>
            <Item.Group divided>
                {patientinfo.map(patient =>(
                    <Item key = {patient.id}>
                        <Item.Content>
                            <Item.Header as ='a'>{patient.p_fname}</Item.Header>
                            <Item.Meta>{patient.p_lname}</Item.Meta>
                            <Item.Description>
                                <div>{patient.p_city}</div>
                                <div>{patient.p_phone},{patient.p_street_address}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button floated='right' content ='View' color='blue'/>
                                <Label basic content ={patient.other_det}/>
                            </Item.Extra>
                        </Item.Content>

                    </Item>
                ))}

            </Item.Group>
        </Segment>
    )
}