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
                {/* <Menu.Item as={NavLink} to='/departments' name='Department' />
                <Menu.Item as={NavLink} to='/receptionists' name='Receptionist' />
                <Menu.Item as={NavLink} to='/nurses' name='Nurse' />
                <Menu.Item as={NavLink} to='/farmacists' name='Farmacist' />
                <Menu.Item as={NavLink} to='/patients' name='Patient' />
                <Menu.Item as={NavLink} to='/cities' name='City' />
                <Menu.Item as={NavLink} to='/therapies' name='Therapy' />
                <Menu.Item as={NavLink} to='/doctors' name='Doctor' />
                <Menu.Item as={NavLink} to='/techEmployees' name='TechEmployee' />
                <Menu.Item as={NavLink} to='/surgeries' name='Surgery' />
                <Menu.Item as={NavLink} to='/countries' name='Country' /> */}
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Dropdown text='Cruds'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/departments' name='Department' content='Department' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/termins' name='Termin' content='Termin' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/receptionists' name='Receptionist' content='Receptionist' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/nurses' name='Nurse' content='Nurse' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink}  to='/farmacists' name='Farmacist' content='Farmacist' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink}  to='/patients' name='Patient' content='Patients' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink}to='/cities' name='City' content='City' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/therapies' name='Therapy' content='Therapy' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/doctors' name='Doctor' content='Doctor' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/techEmployees' name='TechEmployee' content='TechEmployee' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink}  to='/surgeries' name='Surgery' content='Surgery' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink}to='/countries' name='Country' content='Country' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/tests' name='Test' content='Test' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/bloodTypes' name='Blood Types' content='BloodType' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/emergencyDrivers' name='EmergencyDriver' content='EmergencyDriver' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/emergencyDrivers' name='EmergencyDriver' content='EmergencyDriver' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/emergencyDrivers' name='EmergencyDriver' content='EmergencyDriver' />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                {/* <Menu.Item as={NavLink} to='/rooms' name='Room' />
                <Menu.Item as={NavLink} to='/countries' name='Country' /> */}

                <Menu.Item>
                    <Dropdown text='Create'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createDepartment' content='Create Department' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createTermin' content='Create Appointment' />
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
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createCity' content='Create City' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createTherapy' content='Create Therapy' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createDoctor' content='Create Doctor' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createTechEmployee' content='Create TechEmployee' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createSurgery' content='Create Surgery' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createRoom' content='Create Room' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createCountry' content='Create Country' />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createEmergencyDriver' content='Create Emergency Driver' />
                            </Dropdown.Item>
                            {/* <Dropdown.Item>
                                <Button fluid as={NavLink} to='/createTest' content='Create Test' />
                            </Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
                <Menu.Item position='right'>
                    <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                    <Dropdown pointing='top left' text={user?.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profiles/${user?.username}`} text='My Profile' icon='user' />
                            <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})