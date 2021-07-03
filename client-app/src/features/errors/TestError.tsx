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

    function handleBadGuidTermin() {
        axios.get(baseUrl + 'termins/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorTermin() {
        axios.post(baseUrl + 'termins', {}).catch(err => setErrors(err));
    }

   

    function handleBadGuidNurse() {
        axios.get(baseUrl + 'nurses/notaguid').catch(err => console.log(err));
        axios.get(baseUrl + 'farmacists/notaguid').catch(err => console.log(err));
        axios.get(baseUrl + 'bloodtypes/notaguid').catch(err => console.log(err));
        axios.get(baseUrl + 'techEmployees/notaguid').catch(err => console.log(err));
        axios.get(baseUrl + 'tests/notaguid').catch(err => console.log(err));

    }

    function handleBadGuidReceptionist() {
        axios.get(baseUrl + 'receptionists/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorReceptionist() {
        axios.post(baseUrl + 'receptionists', {}).catch(err => setErrors(err));
    }

    function handleBadGuidCity() {
        axios.get(baseUrl + 'cities/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorCity() {
        axios.post(baseUrl + 'cities', {}).catch(err => setErrors(err));
    }


    function handleValidationErrorNurse() {
        axios.post(baseUrl + 'nurses', {}).catch(err => setErrors(err));
        axios.post(baseUrl + 'farmacists', {}).catch(err => setErrors(err));
        axios.post(baseUrl + 'bloodtypes', {}).catch(err => setErrors(err));
        axios.post(baseUrl + 'techEmployees', {}).catch(err => setErrors(err));
        axios.post(baseUrl + 'tests', {}).catch(err => setErrors(err));

    }
    function handleBadGuidPatient() {
        axios.get(baseUrl + 'patients/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationErrorPatient() {
        axios.post(baseUrl + 'patients', {}).catch(err => setErrors(err));
    }

    function handleBadGuidDoctor() {
        axios.get(baseUrl + 'doctors/notaguid').catch(err => console.log(err));
        axios.get(baseUrl + 'doctors/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationErrorDoctor() {
        axios.post(baseUrl + 'doctors', {}).catch(err => setErrors(err));
    }

    function handleBadGuidRoom() {
        axios.get(baseUrl + 'rooms/notaguid').catch(err => console.log(err.response));
    }

    function handleValidationErrorRoom() {
        axios.post(baseUrl + 'rooms', {}).catch(err => setErrors(err));
    }

    function handleBadGuidTherapy() {
        axios.get(baseUrl + 'therapies/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorTherapy() {
        axios.post(baseUrl + 'therapies', {}).catch(err => setErrors(err));
    }

    function handleBadGuidCountry() {
        axios.get(baseUrl + 'countries/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorCountry() {
        axios.post(baseUrl + 'countries', {}).catch(err => setErrors(err));
    }

    function handleBadGuidEmergencyDriver() {
        axios.get(baseUrl + 'emergencyDrivers/notaguid').catch(err => console.log(err));
    }

    function handleValidationErrorEmergencyDriver() {
        axios.post(baseUrl + 'emergencyDrivers', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error component' />
            <Segment>
                <Button.Group widths='10'>
                    <Button onClick={handleNotFound} content='Not Found' basic primary />
                    <Button onClick={handleBadRequest} content='Bad Request' basic primary />
                    <Button onClick={handleValidationErrorDepartment} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorTermin} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorReceptionist} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorNurse} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorPatient} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorCity} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorDoctor} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorRoom} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorTherapy} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorCountry} content='Validation Error' basic primary />
                    <Button onClick={handleValidationErrorEmergencyDriver} content='Validation Error' basic primary />
                    <Button onClick={handleServerError} content='Server Error' basic primary />
                    <Button onClick={handleUnauthorised} content='Unauthorised' basic primary />
                    <Button onClick={handleBadGuidDepartment} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidTermin} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidReceptionist} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidNurse} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidPatient} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidCity} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidDoctor} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidRoom} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidTherapy} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidCountry} content='Bad Guid' basic primary />
                    <Button onClick={handleBadGuidEmergencyDriver} content='Bad Guid' basic primary />
                </Button.Group>
            </Segment>
            {errors &&
                <ValidationErrors errors={errors} />
            }
        </>
    )
}