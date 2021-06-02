import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Receptionist } from '../models/receptionist';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';

function App() {
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [bloodtypes, setBloodTypes] = useState([]);
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);


  useEffect(() => {
    axios.get<Receptionist[]>('http://localhost:5000/api/receptionists').then(response => {
      setReceptionists(response.data);
    })
    axios.get('http://localhost:5000/api/bloodtypes').then(response => {
      console.log(response);
      setBloodTypes(response.data);
    })
  }, [])

  function handleSelectReceptionist(id: string) {
    setSelectedReceptionist(receptionists.find(x => x.id === id));
  }

  function handleCancelSelectReceptionist() {
    setSelectedReceptionist(undefined);
  }

  function handleFormOpen(id?: string) {
    id ? handleSelectReceptionist(id) : handleCancelSelectReceptionist();
    setEditMode(true);
  }

  function handleFormClose() {
    setEditMode(false);
  }

  function handleCreateOrEditReceptionist(receptionist: Receptionist) {
    receptionist.id 
      ? setReceptionists([...receptionists.filter(x => x.id !== receptionist.id), receptionist])
      : setReceptionists([...receptionists, {...receptionist, id: uuid()}]);
    setEditMode(false);
    setSelectedReceptionist(receptionist);
  }

  function handleDeleteReceptionist(id: string) {
    setReceptionists([...receptionists.filter(x => x.id !== id)])
  }

  return (
    <div>
      <Header as='h2' icon='users' content='HMS' />
      <List>
          {departments.map((department: any) => (
            <List.Item key={department.id}>
              {department.departmentName}
            </List.Item>
          ))}
        </List>
        <List>
        {cities.map((city: any) => (
            <List.Item key={city.id}>
              {city.cityName}
              {city.zipCode}
            </List.Item>
          ))}
        </List>
        <List>
        {bloodtypes.map((type: any) => (
            <List.Item key={type.id}>
              {type.type}
      
            </List.Item>
          ))}
        </List>
    </div>
    <>
      <NavBar openForm={handleFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ReceptionistDashboard 
          receptionists={receptionists} 
          selectedReceptionist={selectedReceptionist}
          selectReceptionist={handleSelectReceptionist}
          cancelSelectReceptionist={handleCancelSelectReceptionist}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handleCreateOrEditReceptionist}
          deleteReceptionist={handleDeleteReceptionist}
        />
      </Container>

    </>
  );
}

export default App;