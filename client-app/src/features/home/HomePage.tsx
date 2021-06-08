import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react';

export default function HomePage() {
    return(
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}} />
                    HMS
                </Header>
                <Header as='h2' inverted content='Welcome to our Hospital!' />
                <Button as={Link} to='/departments' size='huge' inverted>
                    Go to Departments!
                </Button>
                <Button as={Link} to='/receptionists' size='huge' inverted>
                    Go to Receptionists!
                </Button>
            </Container>
        </Segment>
        // <Container style={{marginTop: '7em'}}>
        //     <h1>Welcome to our Hospital!</h1>
        //     <h3>Go to<Link to='/departments'> Departments</Link></h3>
        //     <h3>Go to<Link to='/receptionists'> Receptionists</Link></h3>
        // </Container>
    )
}