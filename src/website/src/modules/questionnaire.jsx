// JavaScript framework
import React, { useState } from 'react';
import Axios from "axios";
import Moment from "moment";

// Style framework
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

// Layout style
const box = {
    position: "relative",
    width: "100%",
    height: "100%"
}

function Questionnaire() {
    const handleSubmit = (event) => {
        // Retrieve form data.
        const form = event.currentTarget;
        // Stop default action and reload page.
        event.preventDefault();
        event.stopPropagation();
        console.log(Moment.current());
        const data = {
            uid: Moment.timestamp(),
            email: form.formBasicEmail.value,
            passwd: form.formBasicPassword.value
        }
        Axios.put(`/api/alg/${form.formBasicRadiobox.value}`, data).then(( response ) => {
            console.log(response);
        });
    };

    return <div style={box}>
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicRadiobox">
                <Form.Label>Select connection type</Form.Label>
                <Form.Check type="radio" name="conn-type" value="ssh" label="SSH" />
                <Form.Check type="radio" name="conn-type" value="ssh-sf" label="SSH & SharedFolder" />
                <Form.Check type="radio" name="conn-type" value="sf" label="SharedFolder" />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    </div>
}

export default Questionnaire
