import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Menu } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import Add from './Add';
import TestList from './TestList';


export default observer(function TestDashboard() {

    const {testStore} = useStore();
    const {loadTests, testRegistry} = testStore;

    useEffect(() => {
        if (testRegistry.size <= 1) loadTests();
    }, [testRegistry.size, loadTests])

    if (testStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
        
    //     <Grid>
            
    //         <Grid.Row columns={1}>
    //     <Grid.Column>
    //     <h2 >Tests</h2>
    //     </Grid.Column>
     
    //   </Grid.Row>
    //         <Grid.Column width='13' >
    //             <TestList />
    //         </Grid.Column>
            
    //         <Grid.Column width='5'>
    //         <Menu vertical size='large' style={{ width: '100%' }}>
    //             <Header icon='filter' attached color='teal' content='Filters' />
    //             <Menu.Item content='All Tests in Hospital' />

    //         </Menu>
    //         </Grid.Column>
    //         <Header />
           
       
    //         <Grid.Column/>
    //         <Grid.Column><Add/></Grid.Column>
        
          
    //     </Grid>
    <Grid>
    <Grid.Column width='10'>
        <TestList />
    </Grid.Column>
    <Grid.Column width='5'>
    <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='lab' attached color='teal' content='Tests' />
                
            </Menu>
            <Header />
           
        </>
      <Button
  as={Link}
  to={`/createNurses`}
  color='blue'
   floated='right'
  content='Add'
/>
    </Grid.Column>
  
</Grid>
    )
})
