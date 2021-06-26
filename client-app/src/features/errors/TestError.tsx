import React, { useState } from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    const baseUrl = 'http://localhost:5000/api/'
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuidDepartment() {
        axios.get(baseUrl + 'departments/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorDepartment() {
        axios.post(baseUrl + 'departments', {}).catch(err => setErrors(err));
    }

    function handleBadGuidReceptionist() {
        axios.get(baseUrl + 'receptionists/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorReceptionist() {
        axios.post(baseUrl + 'receptionists', {}).catch(err => setErrors(err));
    }
    function handleBadGuidNurse() {
        axios.get(baseUrl + 'nurses/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorNurse() {
        axios.post(baseUrl + 'nurses', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='10'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationErrorDepartment} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorReceptionist} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorNurse} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuidDepartment} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidReceptionist} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidNurse} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors &&
                <ValidationErrors errors={errors} />
            }
        </>
    )
}