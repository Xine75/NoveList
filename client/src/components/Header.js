import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import {
    Collapse,
    Navbar,
    Nav,
    NavItem,
    NavLink
} from 'react-bootstrap';
import { UserProfileContext } from "./Providers/UserProfileProvider";

export default function Header() {
    const { isLoggedIn, logout } = useContext(UserProfileContext);
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const userProfile = JSON.parse(sessionStorage.getItem("userProfile"));

    return (
        <div>
            <Navbar color="light" light expand="md">
                <Navbar.Brand tag={RRNavLink} to="/">Tabloid</Navbar.Brand>
                <Navbar.Toggle onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home and Post links */}
                        {isLoggedIn &&
                            <NavItem className="nav-items">
                                <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                <NavLink tag={RRNavLink} to="/post">Posts</NavLink>
                                <NavLink tag={RRNavLink} to="/myPosts">My Posts</NavLink>
                                <NavLink tag={RRNavLink} to="/category">Categories</NavLink>
                                <NavLink tag={RRNavLink} to="/post/add">Add Post</NavLink>
                            </NavItem>
                        }
                        {isLoggedIn && userProfile.userTypeId == 1 &&
                            <NavItem className="nav-items">
                                <NavLink tag={RRNavLink} to="/tag">Tag Management</NavLink>
                                <NavLink tag={RRNavLink} to="/userProfiles">User Profiles</NavLink>
                            </NavItem>
                        }
                    </Nav>
                    <Nav navbar>
                        {isLoggedIn &&
                            <>
                                <NavItem>
                                    <a aria-current="page" className="nav-link"
                                        style={{ cursor: "pointer" }} onClick={logout}>Logout</a>
                                </NavItem>
                            </>
                        }
                        {!isLoggedIn &&
                            <>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={RRNavLink} to="/register">Register</NavLink>
                                </NavItem>
                            </>
                        }
                    </Nav>
                </Collapse>
            </Navbar>
        </div >
    );
}
