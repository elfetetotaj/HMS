import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import DepartmentDetails from '../../features/departments/details/DepartmentDetails';
import DepartmentForm from '../../features/departments/form/DepartmentForm';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import ReceptionistDetails from '../../features/receptionists/details/ReceptionistDetails';
import ReceptionistForm from '../../features/receptionists/form/ReceptionistForm';

function App() {
  const location = useLocation();

  return (
    <>
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/departments' component={DepartmentDashboard} />
              <Route path='/departments/:id' component={DepartmentDetails} />
              <Route key={location.key} path={['/createDepartment', '/managedepartment/:id']} component={DepartmentForm} />

              <Route exact path='/receptionists' component={ReceptionistDashboard} />
              <Route path='/receptionists/:id' component={ReceptionistDetails} />
              <Route key={location.key} path={['/createReceptionist', '/managereceptionist/:id']} component={ReceptionistForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);