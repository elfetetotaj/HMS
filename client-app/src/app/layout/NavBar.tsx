import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default function NavBar() {

    const {departmentStore} = useStore();
    const {receptionistStore} = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px' }}/>
                    HMS
                </Menu.Item>
                <Menu.Item name='Departments' />
                <Menu.Item>
                    <Button onClick={() => departmentStore.openForm()} positive content='Create Department' />
                </Menu.Item>
                <Menu.Item name='Receptionist' />
                <Menu.Item>
                    <Button onClick={() => receptionistStore.openForm()} positive content='Create Receptionist' />
                </Menu.Item>
                {/* <Menu.Item name ='PatientInfo' />
                <Menu.Item>
                    <Button onClick={openFormPatient} positive content='Create Patient' />
                </Menu.Item> */}
            </Container>
        </Menu>
    )
}