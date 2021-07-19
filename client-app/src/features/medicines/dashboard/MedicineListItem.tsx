import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';
import { Medicine } from '../../../app/models/medicine';
// import DepartmentListItemAttendee from './DepartmentListItemAttendee';

interface Props {
    medicine: Medicine;
}

export default function MedicineListItem({medicine}: Props) {

    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' src={`/assets/departmentImages/${medicine.medicineName}.jpg`} />
                       <Item.Content>
                            <Item.Header as={Link} to={`/medicines/${medicine.id}`}>
                                {medicine.medicineName}
                            </Item.Header>
                            <Item.Description>{medicine.medicineDescription}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
                <span>
                    <Icon name='marker' /> {medicine.medicineDepartment}
                </span>
            </Segment>
           <Segment>
                <span>
                    <Icon name='dollar' /> {medicine.medicinePrice}€
                </span>
            </Segment>
           {/* <Segment secondary>
               <DepartmentListItemAttendee departmentAttendees={department.departmentAttendees!} />
           </Segment> */}
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/medicines/${medicine.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}