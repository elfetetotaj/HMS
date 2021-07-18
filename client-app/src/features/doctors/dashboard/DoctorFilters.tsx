import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';


export default function DoctorFilters() {
    return(
        <>
                <Menu vertical size='large' style={{width: '100%' }} >
            <Header icon='filter' attached color='teal' content='Doctors' />
            <Menu.Item content='All Doctors' />
            
        </Menu>
        <Header />
      
        </>

    )
}