import { Link } from 'react-router-dom';
import { Button, Item, Segment } from 'semantic-ui-react';
import { Test } from '../../../app/models/test';
import { useStore } from '../../../app/stores/store';
import TestForm from '../form/TestForm';

interface Props {
    test: Test
}
export default function TestListItem({test}: Props) {

    const {testStore} = useStore();
    const{deleteTest, loading} = testStore;

    return (

<Segment.Group>
           <Segment>
               <Item.Group>
                   <Item>
                       <Item.Image size='tiny' circular src='/assets/test.png' />
                       <Item.Content>
                            <Item.Header as={Link} to={`/tests/${test.id}`}>
                                {test.emri}
                            </Item.Header>
                            <Item.Description>Cmimi: {test.cmimi}</Item.Description>
                            <Item.Description>Pershkrimi: {test.pershkrimi}</Item.Description>
                       </Item.Content>
                   </Item>
               </Item.Group>
           </Segment>
           <Segment clearing>
           

           <Button as={Link} to={`/managetest/${test.id}`} color='green' floated='right'>
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
                                    <Button onClick={() => deleteTest(test.id)} type='submit' content='Delete' disabled={loading} color='red'  ></Button>

           </Segment>

       </Segment.Group>
       
    )
}

