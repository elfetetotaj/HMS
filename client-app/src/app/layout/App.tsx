import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container } from 'semantic-ui-react';
import { Department } from '../models/department';
import { Patient } from '../models/patient';
import NavBar from './NavBar';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import PatientDashboard from '../../features/patientinfo/dashboard/PatientDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {
  const{receptionistStore} = useStore();


  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);
  const [editModeDepartment, setEditModeDepartment] = useState(false);
  const [patientinfo, setPatientinfo] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const [editModePatient, setEditModePatient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // agent.Departments.list().then(response => {
    //   let departments: Department[] = [];
    //   response.forEach(department => {
    //     department.date = department.date.split('T')[0];
    //     departments.push(department);
    //   })
    //   setDepartments(departments);
    //   setLoading(false);
    // })
    // axios.get<Department[]>('http://localhost:5000/api/departments').then(response => {
    //   setDepartments(response.data);
    // })
   
    receptionistStore.loadReceptionists();

    // axios.get<Patient[]>('http://localhost:5000/api/patientinfo').then(response => {
    //   setPatientinfo(response.data);
    // })
  }, [receptionistStore])

  // function handleSelectDepartment(id: string) {
  //   setSelectedDepartment(departments.find(x => x.id === id));
  // }

  // function handleSelectPatient(id: string) {
  //   setSelectedPatient(patientinfo.find(x => x.id === id));
  // }

  // function handleCancelSelectDepartment() {
  //   setSelectedDepartment(undefined);
  // }

  // function handleCancelSelectPatient() {
  //   setSelectedPatient(undefined);
  // }

  // function handleFormOpenDepartament(id?: string) {
  //   id ? handleSelectDepartment(id) : handleCancelSelectDepartment();
  //   setEditModeDepartment(true);
  //   setEditModeReceptionist(false);
  //   setEditModePatient(false);
  // }

  // function handleFormOpenPatient(id?: string) {
  //   id ? handleSelectPatient(id) : handleCancelSelectPatient();
  //   setEditModeDepartment(false);
  //   setEditModeReceptionist(false);
  //   setEditModePatient(true);
  // }

  // function handleFormCloseDepartment() {
  //   setEditModeDepartment(false);
  //   setEditModeReceptionist(false);
  //   setEditModePatient(false);
  // }

  // function handleFormClosePatient() {
  //   setEditModeDepartment(false);
  //   setEditModeReceptionist(false);
  //   setEditModePatient(false);
  // }

  // function handleCreateOrEditDepartment(department: Department) {
  //   setSubmitting(true);
  //   if (department.id) {
  //     agent.Departments.update(department).then(() => {
  //       setDepartments([...departments.filter(x => x.id !== department.id), department])
  //       setSelectedDepartment(department);
  //       setEditModeDepartment(false);
  //       setEditModeReceptionist(false);
  //       setEditModePatient(false);
  //       setSubmitting(false);
  //     })
  //   } else {
  //     department.id = uuid();
  //     agent.Departments.create(department).then(() => {
  //       setDepartments([...departments, department])
  //       setSelectedDepartment(department);
  //       setEditModeDepartment(false);
  //       setEditModeReceptionist(false);
  //       setEditModePatient(false);
  //       setSubmitting(false);
  //     })
  //   }
  // }


  // function handleCreateOrEditPatient(patient: Patient) {
  //   patient.id ? setPatientinfo([...patientinfo.filter(x => x.id !== patient.id), patient])
  //   : setPatientinfo([...patientinfo, { ...patient, id: uuid() }]);
  //   setEditModeDepartment(false);
  //   setEditModeReceptionist(false);
  //   setEditModePatient(false);
  //   setSelectedPatient(patient);
  // }

  // function handleDeleteDepartment(id: string) {
  //   setSubmitting(true);
  //   agent.Departments.delete(id).then(() => {
  //     setDepartments([...departments.filter(x => x.id !== id)])
  //     setSubmitting(false);
  //   })
  // }

  // function handleDeletePatient(id: string) {
  //   setPatientinfo([...patientinfo.filter(x => x.id !== id)])
  // }

  if (receptionistStore.loadingInitial) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar 
      // openFormDepartment={handleFormOpenDepartament}  
      // openFormPatient={handleFormOpenPatient} 
      />
        <Container style={{marginTop: '7em'}}>
          {/* <DepartmentDashboard 
            departments={departments} 
            selectedDepartment={selectedDepartment}
            selectDepartment={handleSelectDepartment}
            cancelSelectDepartment={handleCancelSelectDepartment}
            editModeDepartment={editModeDepartment}
            openFormDepartment={handleFormOpenDepartament}
            closeForm={handleFormCloseDepartment}
            createOrEdit={handleCreateOrEditDepartment}
            deleteDepartment={handleDeleteDepartment}
            submitting={submitting}
          /> */}
          
          <ReceptionistDashboard/>

          {/* <PatientDashboard
            patientinfo={patientinfo}
            selectedPatient={selectedPatient}
            selectPatient={handleSelectPatient}
            cancelSelectPatient={handleCancelSelectPatient}
            editModePatient={editModePatient}
            openFormPatient={handleFormOpenPatient}
            closeForm={handleFormClosePatient}
            createOrEdit={handleCreateOrEditPatient}
            deletePatient={handleDeletePatient}
          /> */}
        </Container>
    </Fragment>
  );
}

export default observer(App);