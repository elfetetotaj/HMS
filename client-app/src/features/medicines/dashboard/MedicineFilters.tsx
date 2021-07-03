import React from 'react';
import Calendar from 'react-calendar';
import { Header, Menu } from 'semantic-ui-react';

export default function MedicineFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Medicines available' />
                <Menu.Item content='Medicines not available' />
                {/* <Menu.Item content="I'm going" /> */}
                {/* <Menu.Item content="I'm hosting" /> */}
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}