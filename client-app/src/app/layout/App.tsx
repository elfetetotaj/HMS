import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Department } from '../models/department';
import NavBar from './NavBar';
import DepartmentDashboard from '../../features/departments/dashboard/DepartmentDashboard';
import {v4 as uuid} from 'uuid';

function App() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get<Department[]>('http://localhost:5000/api/departments').then(response => {
      setDepartments(response.data);
    })
    axios.get('http://localhost:5000/api/cities').then(response => {
      setCities(response.data);
    })
  }, [])

  function handleSelectDepartment(id: string) {
    setSelectedDepartment(departments.find(x => x.id === id));
  }

  function handleCancelSelectDepartment() {
    setSelectedDepartment(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectDepartment(id) : handleCancelSelectDepartment();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditDepartment(department: Department) {
    department.id ? setDepartments([...departments.filter(x => x.id !== department.id), department])
    : setDepartments([...departments, {...department}]);
    setEditMode(false);
    setSelectedDepartment(department);
  }

  function handleDeleteDepartment(id: string) {
    setDepartments([...departments.filter(x => x.id !== id)])
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
        <Container style={{marginTop: '7em'}}>
          <DepartmentDashboard 
            departments={departments} 
            selectedDepartment={selectedDepartment}
            selectDepartment={handleSelectDepartment}
            cancelSelectDepartment={handleCancelSelectDepartment}
            editMode={editMode}
            openForm={handleFormOpen}
            closeForm={handleFormClose}
            createOrEdit={handleCreateOrEditDepartment}
            deleteDepartment={handleDeleteDepartment}
          />
        </Container>
    </Fragment>
  );
}

export default App;
