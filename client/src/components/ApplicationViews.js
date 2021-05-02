import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext, UserProfileProvider } from "./Providers/UserProfileProvider";
import { NoteProvider } from "./Providers/NoteProvider";
import Login from "./Login/Login";
import Register from "./Login/Register";
import Hello from "./Hello";
import NoteList from "./Note/NoteList"

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

            <Route path="/notes/:id(\d+)" exact>
                <NoteProvider>
                    {isLoggedIn ? <NoteList /> : <Redirect to="/login" />}
                </NoteProvider>
            </Route>


        </Switch>
    );
};
