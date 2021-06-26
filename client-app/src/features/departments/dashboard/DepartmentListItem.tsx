import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';

interface Props {
    department: Department
}

export default function DepartmentListItem({department}: Props) {

    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' src={`/assets/departmentImages/${department.departmentName}.jpg`} />
                       <Item.Content>
                            <Item.Header as={Link} to={`/departments/${department.id}`}>
                                {department.departmentName}
                            </Item.Header>
                            <Item.Description>{department.departmentDescription}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/departments/${department.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}