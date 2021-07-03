import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';


export default function RoomFilters() {
    return(
        <>
                <Menu vertical size='large' style={{width: '100%' }} >
            <Header icon='filter' attached color='teal' content='Filters' />
            <Menu.Item content='All Rooms' />
            <Menu.Item content="Patients" />
            <Menu.Item content="Beds" />
        </Menu>
        <Header />
        <Calendar />
        </>

    )
}