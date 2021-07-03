import format from 'date-fns/format';
import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { TechEmployee } from '../../../app/models/techEmployee';
import { useStore } from '../../../app/stores/store';

interface Props {
    techEmployee: TechEmployee
}

export default function TechEmployeeListItem({techEmployee}: Props) {
    const history = useHistory();
    const {techEmployeeStore} = useStore();
    const{deleteTechEmployee, updateTechEmployee, loading, loadTechEmployee, loadingInitial} = techEmployeeStore;
    const {id} = useParams<{id: string}>();

    return (
       <Segment.Group>
           
           <Segment>
           <p> {techEmployee.username}</p>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/user.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/techEmployees/${techEmployee.id}`}>
                                {techEmployee.emri}
                            </Item.Header>
                            <Item.Description>Pershkrim i infermierit/es</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment>
               <span>
                   <Icon name='calendar'/> {format(techEmployee.datelindja!, 'dd MMM yyyy')}
                   <br/>
                   <Icon name='map marker' />{techEmployee.adresa}
               </span>
           </Segment>
           <Segment clearing>
           <Button as={Link} to={`/managetechEmployee/${techEmployee.id}`} color='orange' floated='right'>
                Edit
           </Button>
           {/* <Button
										onClick={(e) => {
											deleteTechEmployee(e, techEmployee.id!);
											history.push('/techEmployees');
										}}
										
										name={techEmployee.id}
										floated='right'
										negative
										type='submit'
										content='Delete'
										disabled={loading}
									/> */}
                                    <Button onClick={() => deleteTechEmployee(techEmployee.id)} type='submit' color='red' disabled={loading} >Delete</Button>

           </Segment>
       </Segment.Group>
    )
}

