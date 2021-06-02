import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [cities, setCities] = useState([]);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setCities(response.data);
    })
    axios.get('http://localhost:5000/api/departments').then(response => {
      console.log(response);
      setDepartments(response.data);
    })
  }, [])
  
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
              {city.CityName}
              {city.ZipCode}
            </List.Item>
          ))}
        </List>
    </div>
  );
}

export default App;