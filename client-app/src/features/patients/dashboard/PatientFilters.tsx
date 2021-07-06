import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';


export default function PatientFilters() {
    return(
        <>
                <Menu vertical size='large' style={{width: '100%' }} >
            <Header icon='filter' attached color='teal' content='Patients' />
            <Menu.Item content='All Patients' />
           
        </Menu>
        <Header />
     
        </>

    )
}