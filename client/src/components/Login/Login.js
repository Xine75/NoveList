import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { useHistory, Link } from "react-router-dom";
import { UserProfileContext } from "./../Providers/UserProfileProvider";

export default function Login() {
    const history = useHistory();
    const { login } = useContext(UserProfileContext);

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const loginSubmit = (e) => {
        e.preventDefault();
        login(email, password)
            .then(() => history.push("/"))
            .catch(() => alert("Invalid email or password"));
    };

    return (
        <Form onSubmit={loginSubmit}>
            <fieldset>
                <FormGroup>
                    <InputGroup.Text for="email">Email</InputGroup.Text>
                    <InputGroup id="email" type="text" onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <InputGroup.Text for="password">Password</InputGroup.Text>
                    <InputGroup id="password" type="password" onChange={e => setPassword(e.target.value)} />
                </FormGroup>
                <FormGroup>
                    <Button>Login</Button>
                </FormGroup>
                <em>
                    Not registered? <Link to="register">Register</Link>
                </em>
            </fieldset>
        </Form>
    );
}