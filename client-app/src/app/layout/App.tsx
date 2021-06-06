import React, { Fragment, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const {receptionistStore} = useStore();
  const {departmentStore} = useStore();

  useEffect(() => {
    departmentStore.loadDepartments();
    receptionistStore.loadReceptionists();
  }, [departmentStore, receptionistStore])

  if (departmentStore.loadingInitial && receptionistStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar />
        <Container style={{marginTop: '7em'}}>
          <DepartmentDashboard />
          <ReceptionistDashboard />
        </Container>
    </Fragment>
  );
}

export default observer(App);