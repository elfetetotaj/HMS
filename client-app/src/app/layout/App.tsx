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
import NurseDetails from '../../features/nurses/details/NurseDetails';
import NurseForm from '../../features/nurses/form/NurseForm';
import FarmacistDashboard from '../../features/farmacist/dashboard/FarmacistDashboard';
import FarmacistDetails from '../../features/farmacist/details/FarmacistDetails';
import FarmacistForm from '../../features/farmacist/form/FarmacistForm';
import PatientDashboard from '../../features/patients/dashboard/PatientDashboard';
import PatientDetails from '../../features/patients/details/PatientDetails';
import PatientForm from '../../features/patients/form/PatientForm';
import CityDashboard from '../../features/cities/dashboard/CityDashboard';
import CityDetails from '../../features/cities/details/CityDetails';
import CityForm from '../../features/cities/form/CityForm';
import { ToastContainer } from 'react-toastify';
import TestErrors from '../../features/errors/TestError';
import ServerError from '../../features/errors/ServerError';
import NotFound from '../../features/errors/NotFound';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponent';
import ModalContainer from '../common/modals/ModalContainer';
import TherapyForm from '../../features/therapies/form/TherapyForm';
import TherapyDetails from '../../features/therapies/details/TherapyDetails';
import TherapyDashboard from '../../features/therapies/dashboard/TherapyDashboard';
import DoctorDashboard from '../../features/doctors/dashboard/DoctorDashboard';
import DoctorDetails from '../../features/doctors/details/DoctorDetails';
import DoctorForm from '../../features/doctors/form/DoctorForm';
import TechEmployeeDashboard from '../../features/techEmployees/dashboard/TechEmployeeDashboard';
import TechEmployeeForm from '../../features/techEmployees/form/techEmployeeForm';

import SurgeryDashboard from '../../features/surgeries/dashboard/SurgeryDashboard';
import SurgeryDetails from '../../features/surgeries/details/SurgeryDetails';
import SurgeryForm from '../../features/surgeries/form/SurgeryForm';
import ProfilePage from '../../features/profiles/ProfilePage';
import CountryDashboard from '../../features/countries/dashboard/CountryDashboard';
import CountryDetails from '../../features/countries/details/CountryDetails';
import CountryForm from '../../features/countries/form/CountryForm';
import TerminDashboard from '../../features/termins/dashboard/TerminDashboard';
import TerminDetails from '../../features/termins/details/TerminDetails';
import TerminForm from '../../features/termins/form/TerminForm';
import RoomDashboard from '../../features/rooms/dashboard/RoomDashboard';
import RoomDetails from '../../features/rooms/details/RoomDetails';
import RoomForm from '../../features/rooms/form/RoomForm';

import TestDashboard from '../../features/tests/dashboard/TestDashboard';
import TestForm from '../../features/tests/form/TestForm';
import BloodTypeDashboard from '../../features/bloodtypes/dashboard/BloodTypeDashboard';
import EmergencyDriverDashboard from '../../features/emergencyDrivers/dashboard/EmergencyDriverDashboard';
import EmergencyDriverDetails from '../../features/emergencyDrivers/details/EmergencyDriverDetails';
import EmergencyDriverForm from '../../features/emergencyDrivers/form/EmergencyDriverForm';
import MedicineDashboard from '../../features/medicines/dashboard/MedicineDashboard';
import MedicineDetails from '../../features/medicines/details/MedicineDetails';
import MedicineForm from '../../features/medicines/form/MedicineForm';
import Home from '../../features/home/Home';

function App() {
  const location = useLocation(); 
  const {commonStore, userStore} = useStore();

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

              <Route exact path='/termins' component={TerminDashboard} />
              <Route path='/termins/:id' component={TerminDetails} />
              <Route path={['/createTermin', '/managetermin/:id']} component={TerminForm} />

              <Route exact path='/medicines' component={MedicineDashboard} />
              <Route path='/medicines/:id' component={MedicineDetails} />
              <Route path={['/createMedicine', '/managemedicine/:id']} component={MedicineForm} />

              <Route exact path='/receptionists' component={ReceptionistDashboard} />
              <Route path='/receptionists/:id' component={ReceptionistDetails} />
              <Route key={location.key} path={['/createReceptionist', '/managereceptionist/:id']} component={ReceptionistForm} />

              <Route exact path='/nurses' component={NurseDashboard} />
              <Route path='/nurses/:id' component={NurseDetails} />
              <Route key={location.key} path={['/createNurse', '/managenurse/:id']} component={NurseForm} />
              
              <Route exact path='/farmacists' component={FarmacistDashboard} />
              <Route path='/farmacists/:id' component={FarmacistDetails} />
              <Route key={location.key} path={['/createFarmacist', '/managefarmacist/:id']} component={FarmacistForm} />

              <Route exact path='/techEmployees' component={TechEmployeeDashboard} />
              {/* <Route path='/farmacists/:id' component={FarmacistDetails} /> */}
              <Route key={location.key} path={['/createTechEmployee', '/managetechEmployee/:id']} component={TechEmployeeForm} />

              <Route exact path='/patients' component={PatientDashboard} />
              <Route path='/patients/:id' component={PatientDetails} />
              <Route key={location.key} path={['/createPatient', '/managepatient/:id']} component={PatientForm} />

              <Route exact path='/cities' component={CityDashboard} />
              <Route path='/cities/:id' component={CityDetails} />
              <Route key={location.key} path={['/createCity', '/managecity/:id']} component={CityForm} />

              <Route exact path='/therapies' component={TherapyDashboard} />
              <Route path='/therapies/:id' component={TherapyDetails} />
              <Route key={location.key} path={['/createTherapy', '/managetherapy/:id']} component={TherapyForm} />

              <Route exact path='/doctors' component={DoctorDashboard} />
              <Route path='/doctors/:id' component={DoctorDetails} />
              <Route key={location.key} path={['/createDoctor', '/managedoctor/:id']} component={DoctorForm} />

              <Route exact path='/surgeries' component={SurgeryDashboard} />
              <Route path='/surgeries/:id' component={SurgeryDetails} />
              <Route key={location.key} path={['/createSurgery', '/managesurgery/:id']} component={SurgeryForm} />

              <Route exact path='/rooms' component={RoomDashboard} />
              <Route path='/rooms/:id' component={RoomDetails} />
              <Route key={location.key} path={['/createRoom', '/manageroom/:id']} component={RoomForm} />

              <Route exact path='/countries' component={CountryDashboard} />
              <Route path='/countries/:id' component={CountryDetails} />
              <Route key={location.key} path={['/createCountry', '/managecountry/:id']} component={CountryForm} />

              <Route exact path='/emergencyDrivers' component={EmergencyDriverDashboard} />
              <Route path='/emergencyDrivers/:id' component={EmergencyDriverDetails} />
              <Route key={location.key} path={['/createEmergencyDriver', '/manageemergencyDriver/:id']} component={EmergencyDriverForm} />
              
              <Route exact path='/tests' component={TestDashboard} />
              {/* <Route path='/farmacists/:id' component={FarmacistDetails} /> */}
              <Route key={location.key} path={['/createTest', '/managetest/:id']} component={TestForm} />

              <Route exact path='/bloodTypes' component={BloodTypeDashboard} />
              <Route path='/home' component={Home}/>
              <Route path='/profiles/:username' component={ProfilePage}/>
              <Route path='/errors' component={TestErrors}/>
              <Route path='/server-error' component={ServerError}/>
              <Route path='/login' component={LoginForm}/>
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