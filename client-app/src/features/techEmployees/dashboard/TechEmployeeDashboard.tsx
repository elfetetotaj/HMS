import { observer } from 'mobx-react-lite';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Grid, Header, Menu } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';

import TechEmployeeList from './TechEmployeeList';

export default observer(function TechEmployeeDashboard() {

    const {techEmployeeStore} = useStore();
    const {loadTechEmployees, techEmployeeRegistry} = techEmployeeStore;

    useEffect(() => {
        if (techEmployeeRegistry.size <= 1) loadTechEmployees();
    }, [techEmployeeRegistry.size, loadTechEmployees])

    if (techEmployeeStore.loadingInitial) return <LoadingComponent content='Loading app' />

    return (
       
//    <Grid>
//         <Grid.Row columns={1}>
//         <Grid.Column>
//         <h2>Farmacists</h2>
//         <Button
//           as={Link}
//           to={`/createTechEmployee`}
//           color='blue'
//            floated='left'
//           content='Add'
//         />
//         </Grid.Column>
//         <Grid.Column>
//         </Grid.Column>
//       </Grid.Row>
            
//             <Grid.Column width='10'>
//                 <TechEmployeeList />
   
            
//             </Grid.Column>
         
          
//         </Grid>
<Grid>
<Grid.Column width='10'>
    <TechEmployeeList />
</Grid.Column>
<Grid.Column width='5'>
<>
        <Menu vertical size='large' style={{ width: '100%' }}>
            <Header icon='lab' attached color='teal' content='Tech Employee' />
            
        </Menu>
        <Header />
       
    </>
  <Button
as={Link}
to={`/createTechEmployee`}
color='blue'
floated='right'
content='Add'
/>
</Grid.Column>

</Grid>
    )
})