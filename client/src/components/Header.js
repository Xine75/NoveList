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
                <Navbar.Brand href="/">NoveList</Navbar.Brand>
                <Navbar.Toggle onClick={toggle} />
                <Navbar.Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        { /* When isLoggedIn === true, we will render the Home and Post links */}
                        {isLoggedIn &&
                            <NavItem className="nav-items">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/book">Novels</Nav.Link>
                                {/* <Nav.Link href="/shelves">Shelves</Nav.Link> */}
                                <Nav.Link href="/friend">Friends</Nav.Link>
                                <Nav.Link href="/search">Search</Nav.Link>
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
