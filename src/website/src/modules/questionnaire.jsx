// JavaScript framework
import React, { useState } from 'react';
import Axios from "axios";

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
        const data = {
            uid: "12345678",
            channel: form.formBasicEmail.value,
            tag: form.formBasicPassword.value,
            content: form.formBasicCheckbox.checked
        }
        Axios.put(`/api/alg/`, data).then(( response ) => {
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
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    </div>
}

export default Questionnaire
