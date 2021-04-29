import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./../Providers/UserProfileProvider";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, userName, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <InputGroup.Text htmlFor="firstName">First Name</InputGroup.Text>
                    <input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text htmlFor="lastName">Last Name</InputGroup.Text>
                    <input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text htmlFor="userName">Display Name</InputGroup.Text>
                    <input id="userName" type="text" onChange={e => setUserName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="email">Email</InputGroup.Text>
                    <input id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="password">Password</InputGroup.Text>
                    <input id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="confirmPassword">Confirm Password</InputGroup.Text>
                    <input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}