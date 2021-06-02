import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Department } from '../models/department';
import { Receptionist } from '../models/receptionist';
import NavBar from './NavBar';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Department[]>('http://localhost:5000/api/departments').then(response => {
      setDepartments(response.data);
    })
    axios.get<Receptionist[]>('http://localhost:5000/api/receptionists').then(response => {
      setReceptionists(response.data);
    })
  }, [])

  function handleSelectDepartment(id: string) {
    setSelectedDepartment(departments.find(x => x.id === id));
  }

  function handleSelectReceptionist(id: string) {
    setSelectedReceptionist(receptionists.find(x => x.id === id));
  }

  function handleCancelSelectDepartment() {
    setSelectedDepartment(undefined);
  }

  function handleCancelSelectReceptionist() {
    setSelectedReceptionist(undefined);
  }

  function handleFormOpenDepartament(id?: string) {
    id ? handleSelectDepartment(id) : handleCancelSelectDepartment();
    setEditMode(true);
  }

  function handleFormOpenReceptionist(id?: string) {
    id ? handleSelectReceptionist(id) : handleCancelSelectReceptionist();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditDepartment(department: Department) {
    department.id ? setDepartments([...departments.filter(x => x.id !== department.id), department])
    : setDepartments([...departments, {...department, id: uuid()}]);
    setEditMode(false);
    setSelectedDepartment(department);
  }

  function handleCreateOrEditReceptionist(receptionist: Receptionist) {
    receptionist.id
      ? setReceptionists([...receptionists.filter(x => x.id !== receptionist.id), receptionist])
      : setReceptionists([...receptionists, { ...receptionist, id: uuid() }]);
    setEditMode(false);
    setSelectedReceptionist(receptionist);
  }

  function handleDeleteDepartment(id: string) {
    setDepartments([...departments.filter(x => x.id !== id)])
  }

  function handleDeleteReceptionist(id: string) {
    setReceptionists([...receptionists.filter(x => x.id !== id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpenDepartament} />
        <Container style={{marginTop: '7em'}}>
          <DepartmentDashboard 
            departments={departments} 
            selectedDepartment={selectedDepartment}
            selectDepartment={handleSelectDepartment}
            cancelSelectDepartment={handleCancelSelectDepartment}
            editMode={editMode}
            openForm={handleFormOpenDepartament}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditDepartment}
            deleteDepartment={handleDeleteDepartment}
          />
          <ReceptionistDashboard
            receptionists={receptionists}
            selectedReceptionist={selectedReceptionist}
            selectReceptionist={handleSelectReceptionist}
            cancelSelectReceptionist={handleCancelSelectReceptionist}
            editMode={editMode}
            openForm={handleFormOpenReceptionist}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditReceptionist}
            deleteReceptionist={handleDeleteReceptionist}
          />
        </Container>
    </Fragment>
  );
}

export default App;
