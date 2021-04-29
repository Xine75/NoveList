import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "./../Providers/UserProfileProvider";

export default function Register() {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [displayName, setDisplayName] = useState();
    const [email, setEmail] = useState();
    const [imageLocation, setImageLocation] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const registerClick = (e) => {
        e.preventDefault();
        if (password && password !== confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const userProfile = { firstName, lastName, displayName, imageLocation, email };
            register(userProfile, password)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <InputGroup.Text htmlFor="firstName">First Name</InputGroup.Text>
                    <InputGroup id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text htmlFor="lastName">Last Name</InputGroup.Text>
                    <InputGroup id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text htmlFor="displayName">Display Name</InputGroup.Text>
                    <InputGroup id="displayName" type="text" onChange={e => setDisplayName(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="email">Email</InputGroup.Text>
                    <InputGroup id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text htmlFor="imageLocation">Profile Image URL</InputGroup.Text>
                    <InputGroup id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="password">Password</InputGroup.Text>
                    <InputGroup id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="confirmPassword">Confirm Password</InputGroup.Text>
                    <InputGroup id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Register</Button>
                </FormGroup>
            </fieldset>
        </Form>
    );
}