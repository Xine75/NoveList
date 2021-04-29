import React from "react";
import { Switch, Route } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "../providers/UserProfileProvider";
import Login from "./Login/Login"
import Register from "./Login/Register"

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

            <Route path="/posts/add">
                <PostForm />
            </Route>

        </Switch>
    );
};

export default ApplicationViews;