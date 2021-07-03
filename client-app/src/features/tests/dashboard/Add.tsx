import React from 'react';
import Calendar from 'react-calendar';
import { Link } from 'react-router-dom';
import { Button, Header, Menu, Segment } from 'semantic-ui-react';

export default function Add() {
    return (
        <Button as={Link} to={'/createTest'} color='blue' floated='right' width='50' >

Add
        </Button>
           
           

        
    )
}