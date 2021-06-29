import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oops - we've looked everywhere and could not find this.
            </Header>
            <Segment.Inline>
                <Button as={Link} to='/departments' primary>
                    Return to departments page
                </Button>
                <Button as={Link} to='/receptionists' primary>
                    Return to receptionists page
                </Button>
                <Button as={Link} to='/nurses' primary>
                    Return to nurses page
                </Button>
                <Button as={Link} to='/farmacists' primary>
                    Return to Farmacists page
                </Button>
                <Button>
                <Button as={Link} to='/patients' primary >
                    Return to patients page 
                </Button>
                <Button as={Link} to='/cities' primary >
                    Return to cities page 
                </Button>
                <Button as={Link} to='/doctors' primary >
                    Return to doctors page 
                </Button>
                </Button>
            </Segment.Inline>
        </Segment>
    )
} 