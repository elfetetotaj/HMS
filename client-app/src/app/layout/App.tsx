import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import DepartmentDetails from '../../features/departments/details/DepartmentDetails';
import DepartmentForm from '../../features/departments/form/DepartmentForm';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import ReceptionistDetails from '../../features/receptionists/details/ReceptionistDetails';
import ReceptionistForm from '../../features/receptionists/form/ReceptionistForm';
import NurseDashboard from '../../features/nurses/dashboard/NurseDashboard';
import NurseDetails from '../../features/nurses/details/NurseDetails';
import NurseForm from '../../features/nurses/form/NurseForm';
import { ToastContainer } from 'react-toastify';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';

function App() {
  const location = useLocation(); 
  // temporary fix, location.key removed te <Route path={['/createDepartment',

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar/>

      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
              <Route exact path='/departments' component={DepartmentDashboard} />
              <Route path='/departments/:id' component={DepartmentDetails} />
              <Route path={['/createDepartment', '/managedepartment/:id']} component={DepartmentForm} />

              <Route exact path='/receptionists' component={ReceptionistDashboard} />
              <Route path='/receptionists/:id' component={ReceptionistDetails} />
              <Route key={location.key} path={['/createReceptionist', '/managereceptionist/:id']} component={ReceptionistForm} />

              <Route exact path='/nurses' component={NurseDashboard} />
              <Route path='/nurses/:id' component={NurseDetails} />
              <Route key={location.key} path={['/createNurse', '/managenurse/:id']} component={NurseForm} />

              <Route path='/errors' component={TestErrors}/>
              <Route path="/server-error" component={ServerError}/>
              <Route component={NotFound} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);