import React from 'react';
import { Header, Menu } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

export default function NurseFilters() {
    const {nurseStore} = useStore();
   
    const{nurseRegistry} = nurseStore;
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%' }}>
                <Header icon='filter' attached color='teal' content='Nurses' />
                <Menu.Item content='Total nurses in hospital ' />
                <Menu.Item content={nurseRegistry.size} />
               

            </Menu>
            <Header />
           
        </>
    )
}