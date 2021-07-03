import React from 'react';
import { Header, Menu } from 'semantic-ui-react';

export default function NurseFilters() {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached color='teal' content='Nurses' />
                <Menu.Item content='All Nurses' />

            </Menu>
            <Header />
           
        </>
    )
}