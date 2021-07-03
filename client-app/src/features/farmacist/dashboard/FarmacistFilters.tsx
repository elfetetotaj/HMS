import React from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default function FarmacistFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached color='teal' content='Farmacists' />
                <Menu.Item content='All Farmacists' />
                {/* <Menu.Item content="I'm going" />
                <Menu.Item content="I'm hosting" /> */}
            </Menu>
            <Header />
           
        </>
    )
}