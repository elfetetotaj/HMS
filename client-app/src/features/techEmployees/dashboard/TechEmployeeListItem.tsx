import format from 'date-fns/format';
import React from 'react';
import { Link,  } from 'react-router-dom';
import { Button, Icon, Item, Segment } from 'semantic-ui-react';
import { TechEmployee } from '../../../app/models/techEmployee';
import { useStore } from '../../../app/stores/store';

interface Props {
    techEmployee: TechEmployee
}

export default function TechEmployeeListItem({techEmployee}: Props) {
    const {techEmployeeStore} = useStore();
    const{deleteTechEmployee,  loading,} = techEmployeeStore;


    return (
 
       <Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                   <Item.Image src={`/assets/nursesImages/${techEmployee.gjinia}.png`} />
                 
                       <Item.Content>
                            <Item.Header as={Link} to={`/techEmployees/${techEmployee.id}`}>
                             <h1>   {techEmployee.emri} {techEmployee.mbiemri}</h1>
                            <h3>    {techEmployee.department}</h3>

                            </Item.Header>
                            {/* <Item.Description>Pershkrim i infermierit/es</Item.Description> */}
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
           <Button as={Link} to={`/managetechEmployee/${techEmployee.id}`} color='blue' floated='right'>
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

