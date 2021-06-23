import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar() {

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }}/>
                    HMS
                </Menu.Item>
                <Menu.Item as={NavLink} to='/departments' name='Department' />
                <Menu.Item>
                    <Button as={NavLink} to='/createDepartment' positive content='Create Department' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/receptionists' name='Receptionist' />
                <Menu.Item>
                    <Button as={NavLink} to='/createReceptionist' positive content='Create Receptionist' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/nurses' name='Nurse' />
                <Menu.Item>
                    <Button as={NavLink} to='/createNurse' positive content='Create Nurse' />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
            </Container>
        </Menu>
    )
}