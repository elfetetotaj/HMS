import { format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { Department } from '../../../app/models/department';
import { Termin } from '../../../app/models/termin';
// import DepartmentListItemAttendee from './DepartmentListItemAttendee';

interface Props {
    termin: Termin;
}

export default function TerminListItem({termin}: Props) {

    return (
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' src={`/assets/departmentImages/${termin.terminDepartment}.jpg`} />
                       <Item.Content>
                            <Item.Header as={Link} to={`/termins/${termin.id}`}>
                                Termini në: {termin.terminDepartment}
                            </Item.Header>
                            <Item.Description>{termin.terminDescription}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
                <span>
                    <Icon name='clock' />Koha: {format(termin.terminTime!, 'dd MMM yyyy h:mm aa')}
                </span>
            </Segment>
           <Segment>
                <span>
                    <Icon name='marker' />Mjeku: {termin.terminDoctor}
                </span>
            </Segment>
           {/* <Segment secondary>
               <DepartmentListItemAttendee departmentAttendees={department.departmentAttendees!} />
           </Segment> */}
           <Segment clearing>
               <Button 
                    as={Link}
                    to={`/termins/${termin.id}`}
                    color='teal'
                    floated='right'
                    content='View'
               />
           </Segment>
       </Segment.Group>
    )
}