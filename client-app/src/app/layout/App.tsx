import React, { useEffect } from 'react';
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
import FarmacistDetails from '../../features/farmacist/details/FarmacistDetails';
import NurseDetails from '../../features/nurses/details/NurseDetails';
import NurseForm from '../../features/nurses/form/NurseForm';
import { ToastContainer } from 'react-toastify';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import FarmacistDashboard from '../../features/farmacist/dashboard/FarmacistDashboard';
import FarmacistForm from '../../features/farmacist/form/FarmacistForm';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import PatientDetails from '../../features/patients/details/PatientDetails';
import PatientForm from '../../features/patients/form/PatientForm';
import CityDashboard from '../../features/cities/dashboard/CityDashboard';
import CityForm from '../../features/cities/form/CityForm';
import CityDetails from '../../features/cities/details/CityDetails';

function App() {
  const location = useLocation(); 
  const {commonStore, userStore} = useStore();
  // temporary fix, location.key removed te <Route path={['/createDepartment',

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...' />

  return (
    <>
    <ToastContainer position="bottom-right" hideProgressBar/>
    <ModalContainer />
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
              <Route key={location.key} path={['/createReceptionist', '/manageReceptionist/:id']} component={ReceptionistForm} />

              <Route exact path='/nurses' component={NurseDashboard} />
              <Route path='/nurses/:id' component={NurseDetails} />
              <Route key={location.key} path={['/createNurse', '/managenurse/:id']} component={NurseForm} />
              
              <Route exact path='/farmacists' component={FarmacistDashboard} />
              <Route path='/farmacists/:id' component={FarmacistDetails} />
              <Route key={location.key} path={['/createFarmacist', '/managefarmacist/:id']} component={FarmacistForm} />

              <Route exact path='/patients' component={PatientDashboard} />
              <Route path='/patients/:id' component={PatientDetails} />
              <Route key={location.key} path={['/createPatients', '/manage/:id']} component={PatientForm} />

              <Route exact path='/cities' component={CityDashboard} />
              <Route path='/cities/:id' component={CityDetails} />
              <Route key={location.key} path={['/createCity', '/manageCity/:id']} component={CityForm} />

              <Route path='/errors' component={TestErrors}/>
              <Route path="/server-error" component={ServerError}/>
              <Route path="/login" component={LoginForm}/>
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