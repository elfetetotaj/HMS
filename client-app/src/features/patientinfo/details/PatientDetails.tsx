import React from 'react';
import { Button, Card, Icon, Image } from 'semantic-ui-react';
import { Patient } from '../../../app/models/Patient';

interface Props{
    patient : Patient
}
    

export default function PatientDetails({patient} : Props){
    return(
      <Card  fluid>
    <Image src={`/assets/user.png`} />
    <Card.Content>
      <Card.Header>{patient.p_fname}</Card.Header>
      <Card.Meta>
        <span >{patient.p_lname}</span>
      </Card.Meta>
      <Card.Description>
          {patient.p_city}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
     <Button.Group widths ='2'>
         <Button basic color ="blue" content ='Edit'/>
         <Button basic color ="grey" content ='Cancel'/>
     </Button.Group>
    </Card.Content>
  </Card>
    )
}