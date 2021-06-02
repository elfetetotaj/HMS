import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

export default function PatientForm(){
    return(
        <Segment clearing>
            <Form>
                <Form.Input  placeholder ='p_fname'/>
                <Form.Input  placeholder ='p_lname'/>
                <Form.Input  placeholder ='dob'/>
                <Form.Input  placeholder ='p_gender'/>
                <Form.Input  placeholder ='p_street_address'/>
                <Form.Input  placeholder ='p_city'/>
                <Form.Input  placeholder ='p_country'/>
                <Form.Input  placeholder ='p_postal_code'/>
                <Form.Input  placeholder ='p_phone'/>
                <Form.Input  placeholder ='_weight'/>
                <Form.TextArea  placeholder ='other_det'/>
                <Form.Input  placeholder ='p_rdate'/>
                <Button floated = 'right' positive type='submit' content='Submit' />
                <Button floated = 'right'  type='button' content='Cancel' />
            </Form>
        </Segment>
    )
}