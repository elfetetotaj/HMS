import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Department } from '../models/department';
import { Receptionist } from '../models/receptionist';
import { Patient } from '../models/patient';
import NavBar from './NavBar';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import PatientDashboard from '../../features/patientinfo/dashboard/PatientDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);
  const [editModeDepartment, setEditModeDepartment] = useState(false);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | undefined>(undefined);
  const [editModeReceptionist, setEditModeReceptionist] = useState(false);
  const [patientinfo, setPatientinfo] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | undefined>(undefined);
  const [editModePatient, setEditModePatient] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Departments.list().then(response => {
      let departments: Department[] = [];
      response.forEach(department => {
        // department.date = department.date.split('T')[0];
        departments.push(department);
      })
      setDepartments(departments);
      setLoading(false);
    })
    axios.get<Receptionist[]>('http://localhost:5000/api/receptionists').then(response => {
      setReceptionists(response.data);
    })
    axios.get<Patient[]>('http://localhost:5000/api/patientinfo').then(response => {
      setPatientinfo(response.data);
    })
  }, [])

  function handleSelectDepartment(id: string) {
    setSelectedDepartment(departments.find(x => x.id === id));
  }

  function handleSelectReceptionist(id: string) {
    setSelectedReceptionist(receptionists.find(x => x.id === id));
  }

  function handleSelectPatient(id: string) {
    setSelectedPatient(patientinfo.find(x => x.id === id));
  }

  function handleCancelSelectDepartment() {
    setSelectedDepartment(undefined);
  }

  function handleCancelSelectReceptionist() {
    setSelectedReceptionist(undefined);
  }

  function handleCancelSelectPatient() {
    setSelectedPatient(undefined);
  }

  function handleFormOpenDepartament(id?: string) {
    id ? handleSelectDepartment(id) : handleCancelSelectDepartment();
    setEditModeDepartment(true);
    setEditModeReceptionist(false);
    setEditModePatient(false);
  }

  function handleFormOpenReceptionist(id?: string) {
    id ? handleSelectReceptionist(id) : handleCancelSelectReceptionist();
    setEditModeDepartment(false);
    setEditModeReceptionist(true);
    setEditModePatient(false);
  }

  function handleFormOpenPatient(id?: string) {
    id ? handleSelectPatient(id) : handleCancelSelectPatient();
    setEditModeDepartment(false);
    setEditModeReceptionist(false);
    setEditModePatient(true);
  }

  function handleFormCloseDepartment() {
    setEditModeDepartment(false);
    setEditModeReceptionist(false);
    setEditModePatient(false);
  }

  function handleFormCloseReceptionist() {
    setEditModeDepartment(false);
    setEditModeReceptionist(false);
    setEditModePatient(false);
  }

  function handleFormClosePatient() {
    setEditModeDepartment(false);
    setEditModeReceptionist(false);
    setEditModePatient(false);
  }

  function handleCreateOrEditDepartment(department: Department) {
    setSubmitting(true);
    if (department.id) {
      agent.Departments.update(department).then(() => {
        setDepartments([...departments.filter(x => x.id !== department.id), department])
        setSelectedDepartment(department);
        setEditModeDepartment(false);
        setEditModeReceptionist(false);
        setEditModePatient(false);
        setSubmitting(false);
      })
    } else {
      department.id = uuid();
      agent.Departments.create(department).then(() => {
        setDepartments([...departments, department])
        setSelectedDepartment(department);
        setEditModeDepartment(false);
        setEditModeReceptionist(false);
        setEditModePatient(false);
        setSubmitting(false);
      })
    }
  }

  function handleCreateOrEditReceptionist(receptionist: Receptionist) {
    receptionist.id ? setReceptionists([...receptionists.filter(x => x.id !== receptionist.id), receptionist])
    : setReceptionists([...receptionists, { ...receptionist, id: uuid() }]);
    setEditModeDepartment(false);
    setEditModeReceptionist(false);
    setEditModePatient(false);
    setSelectedReceptionist(receptionist);
  }

  function handleCreateOrEditPatient(patient: Patient) {
    patient.id ? setPatientinfo([...patientinfo.filter(x => x.id !== patient.id), patient])
    : setPatientinfo([...patientinfo, { ...patient, id: uuid() }]);
    setEditModeDepartment(false);
    setEditModeReceptionist(false);
    setEditModePatient(false);
    setSelectedPatient(patient);
  }

  function handleDeleteDepartment(id: string) {
    setSubmitting(true);
    agent.Departments.delete(id).then(() => {
      setDepartments([...departments.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  function handleDeleteReceptionist(id: string) {
    setReceptionists([...receptionists.filter(x => x.id !== id)])
  }

  function handleDeletePatient(id: string) {
    setPatientinfo([...patientinfo.filter(x => x.id !== id)])
  }

  if (loading) return <LoadingComponent content='Loading app' />

  return (
    <Fragment>
      <NavBar 
      openFormDepartment={handleFormOpenDepartament} 
      openFormReceptionist={handleFormOpenReceptionist} 
      openFormPatient={handleFormOpenPatient} 
      />
        <Container style={{marginTop: '7em'}}>
          <DepartmentDashboard 
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
          />
          <ReceptionistDashboard
            receptionists={receptionists}
            selectedReceptionist={selectedReceptionist}
            selectReceptionist={handleSelectReceptionist}
            cancelSelectReceptionist={handleCancelSelectReceptionist}
            editModeReceptionist={editModeReceptionist}
            openFormReceptionist={handleFormOpenReceptionist}
            closeForm={handleFormCloseReceptionist}
            createOrEdit={handleCreateOrEditReceptionist}
            deleteReceptionist={handleDeleteReceptionist}
          />
          <PatientDashboard
            patientinfo={patientinfo}
            selectedPatient={selectedPatient}
            selectPatient={handleSelectPatient}
            cancelSelectPatient={handleCancelSelectPatient}
            editModePatient={editModePatient}
            openFormPatient={handleFormOpenPatient}
            closeForm={handleFormClosePatient}
            createOrEdit={handleCreateOrEditPatient}
            deletePatient={handleDeletePatient}
          />
        </Container>
    </Fragment>
  );
}

export default App;