import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Patient } from '../../../app/models/patient';

interface Props {
    patient: Patient;
    cancelSelectPatient: () => void;
    openFormPatient: (id: string) => void;
}

export default function PatientDetails({patient, cancelSelectPatient, openFormPatient}: Props) {
    return (
      <Card fluid>
        <Image src={`/assets/user.png`} />
        <Card.Content>
          <Card.Header>{patient.p_fname}, {patient.p_lname}, {patient.p_gender}</Card.Header>
          <Card.Meta>
            <span >{patient.p_street_address}, {patient.p_postal_code}</span>
          </Card.Meta>
          <Card.Description>
            <div>{patient.p_city}, {patient.p_country} , {patient.p_weight}</div>
            <div>{patient.p_phone}, {patient.other_det}, {patient.p_rdate}</div>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths='2'>
            <Button onClick={() => openFormPatient(patient.id)} basic color='blue' content='Edit' />
            <Button onClick={cancelSelectPatient} basic color='grey' content='Cancel' />
          </Button.Group>
        </Card.Content>
      </Card>
    )
}