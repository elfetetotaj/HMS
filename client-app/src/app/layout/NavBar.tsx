import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px' }}/>
                    HMS
                </Menu.Item>
                <Menu.Item as ={NavLink} to='/' exact header>
                    Home
                </Menu.Item>
                <Menu.Item as ={NavLink} to='/receptionists' name='Receptionist' />
                <Menu.Item>
                    <Button as={NavLink} to='/createReceptionist' positive content='Create Receptionist' />
                </Menu.Item>
                {/* <Menu.Item name='Departments' />
                <Menu.Item>
                    <Button onClick={openFormDepartment} positive content='Create Department' />
                </Menu.Item> */}
                {/* <Menu.Item name ='PatientInfo' />
                <Menu.Item>
                    <Button onClick={openFormPatient} positive content='Create Patient' />
                </Menu.Item> */}
            </Container>
        </Menu>
    )
}