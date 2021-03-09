
//MODULE IMPORT
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import React from 'react'


//COMPONENTS
import Applications from './Applications'
import Developers from './Developers'
import Home from './Home'
import TicketForm from './Forms/TicketForm'
//import Routes from './Routes'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

function Navigation() {
    return (
        <Router >
            <Navbar bg="primary" expand="lg">
                <Navbar.Brand as={Link} to="/home"><h1>Bug Tracker</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav defaultActiveKey="/home" as="ul">
                        {/*
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/home" >Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/developers" >Developers</Nav.Link>
                        </Nav.Item>
                        <Nav.Item as="li">
                            <Nav.Link as={Link} to="/applications">Applications</Nav.Link>
                        </Nav.Item>
                         */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            {/* All Routes*/}
            <Switch>
                <Route path="/ticket/:crud/:id">
                    <TicketForm />
                </Route>
                <Route path="/ticket/:crud">
                    <TicketForm />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/developers">
                    <Developers />
                </Route>
                <Route path="/applications">
                    <Applications />
                </Route>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default Navigation
