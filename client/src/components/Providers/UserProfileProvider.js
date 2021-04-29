import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
    const apiUrl = "/api/userProfile";
    const userProfile = sessionStorage.getItem("userProfile");
    const [userProfiles, setUserProfiles] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);
    const getToken = () => firebase.auth().currentUser.getIdToken();

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);
    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const getAllUserProfiles = () => {
        //the proxy that was set up in package.json will be handling the first part of the URL
        return getToken().then((token) =>
            fetch(`${apiUrl}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()))
            .then(setUserProfiles)
    };

    const getUserProfileById = (id) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json()))

    };

    const deactivateUserProfile = (userProfileId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${userProfileId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(getAllUserProfiles)
        )
    };

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
                setIsLoggedIn(true);
            });
    };

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
            .then((savedUserProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
                setIsLoggedIn(true);
            });
    };


    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/login/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            }).then(resp => resp.json()));
    };

    return (
        <UserProfileContext.Provider value={{ isLoggedIn, login, logout, register, getToken, getUserProfile, getAllUserProfiles, userProfiles, setUserProfiles, getUserProfileById, deactivateUserProfile }}>
            {isFirebaseReady
                ? props.children
                : <Spinner className="app-spinner dark" />}
        </UserProfileContext.Provider>
    );
}