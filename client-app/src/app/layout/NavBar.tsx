import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout } } = useStore();
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    HMS
                </Menu.Item>
                <Menu.Item as={NavLink} to='/departments' name='Department' />
                <Menu.Item as={NavLink} to='/receptionists' name='Receptionist' />
                <Menu.Item as={NavLink} to='/nurses' name='Nurse' />
                <Menu.Item as={NavLink} to='/farmacists' name='Farmacist' />
                <Menu.Item as={NavLink} to='/patients' name='Patients' />

                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Dropdown text='Create'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createDepartment' content='Create Department' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createReceptionist' content='Create Receptionist' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createNurse' content='Create Nurse' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createFarmacist' content='Create Farmacist' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createPatient' content='Create Patient' />
                            </Dropdown.Item>
                            {/* <Button.Group vertical>
                                <Button fluid as={NavLink} to='/createDepartment' content='Create Department' />
                                <Button fluid as={NavLink} to='/createReceptionist' content='Create Receptionist' />
                                <Button fluid as={NavLink} to='/createNurse' content='Create Nurse' />
                            </Button.Group> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})