import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const {userStore, modalStore} = useStore();
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    HMS
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content='Welcome to our Hospital!' />
                        <Button as={Link} to='/departments' size='huge' inverted>
                            Go to Departments!
                        </Button>
                        <Button as={Link} to='/receptionists' size='huge' inverted>
                            Go to Receptionists!
                        </Button>
                        <Button as={Link} to='/nurses' size='tiny' d>
                            Go to Nurses!
                        </Button>
                        <Button as={Link} to='/farmacists' size='huge' inverted>
                            Go to Farmacists!
                        </Button>
                        <Button as={Link} to='/patients' size='huge' inverted>
                            Go to Patients!
                        </Button>
                        <Button as={Link} to='/cities' size='huge' inverted>
                            Go to Cities!
                        </Button>
                        <Button as={Link} to='/doctors' size='huge' inverted>
                            Go to Doctors!
                        </Button>
                        <Button as={Link} to='/therapies' size='huge' inverted>
                            Go to Therapies!
                        </Button>
                        <Button as={Link} to='/surgeries' size='huge' inverted>
                            Go to Surgeries!
                        </Button>
                        <Button as={Link} to='/countries' size='huge' inverted>
                            Go to Countries!
                        </Button> <Button as={Link} to='/countries' size='huge' inverted>
                            Go to Farmacists!
                        </Button>
                        <Button as={Link} to='/countries' size='huge' inverted>
                            Go to Tech Employees!
                        </Button>
                        
                        <Button as={Link} to='/countries' size='huge' inverted>
                            Go to Tests!
                        </Button>
                    </>
                ) : (
                    <>
                    <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                        Login!
                    </Button>
                    <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                        Register!
                    </Button>
                    </>
                )}
            </Container>
        </Segment>
    )
})