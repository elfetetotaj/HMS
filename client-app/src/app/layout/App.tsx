import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Receptionist } from '../models/receptionist';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid';
import ReceptionistDashboard from '../../features/receptionists/dashboard/ReceptionistDashboard';

function App() {
  const [receptionists, setReceptionists] = useState<Receptionist[]>([]);
  const [selectedReceptionist, setSelectedReceptionist] = useState<Receptionist | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Receptionist[]>('http://localhost:5000/api/receptionists').then(response => {
      setReceptionists(response.data);
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