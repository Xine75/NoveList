import React, { useState, useContext } from 'react';
import { NavLink as RRNavLink, useHistory } from "react-router-dom";
import {
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
                <Navbar.Brand tag={RRNavLink} to="/">NoveList</Navbar.Brand>
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home and Post links */}
                        {isLoggedIn &&
                            <NavItem className="nav-items">
                                <NavLink tag={RRNavLink} to="/">Home</NavLink>
                                <NavLink tag={RRNavLink} to="/post">Novels</NavLink>
                                <NavLink tag={RRNavLink} to="/myPosts">Shelves</NavLink>
                                <NavLink tag={RRNavLink} to="/category">Friends</NavLink>
                                <NavLink tag={RRNavLink} to="/post/add">Search</NavLink>
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
                </Navbar.Collapse>
            </Navbar>
        </div >
    );
}
