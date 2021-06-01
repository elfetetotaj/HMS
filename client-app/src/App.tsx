import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';

function App() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(response => {
      console.log(response);
      setCities(response.data);
    })
  }, [])

  return (
    <div>
      <Header as='h2' icon='users' content='Cities' />

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