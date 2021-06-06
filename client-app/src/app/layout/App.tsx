import React from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import { observer } from 'mobx-react-lite';
import { Route, useLocation } from 'react-router';
import HomePage from '../../features/home/HomePage';
import ReceptionistForm from '../../features/receptionists/form/ReceptionistForm';
import ReceptionistDetails from '../../features/receptionists/details/ReceptionistDetails';

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

              <Route exact path='/receptionists' component={ReceptionistDashboard} />
              <Route path='/receptionists/:id' component={ReceptionistDetails} />
              <Route key={location.key} path={['/createReceptionist', '/manage/:id']} component={ReceptionistForm} />
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);