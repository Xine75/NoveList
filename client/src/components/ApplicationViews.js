import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "./Providers/UserProfileProvider";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Hello from "./Hello";

export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);


    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>


        </Switch>
    );
};
