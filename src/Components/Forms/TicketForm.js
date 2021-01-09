import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'


function TicketForm() {
    const { crud, id } = useParams()

    return (
        <Form>
            <Row>
                <Col lg={6}>
                    <Form.Group controlId="ticketNumber">
                        <Form.Label >Ticket #: {id}</Form.Label>
                    </Form.Group>
                </Col>
                <Col lg={6}>
                    <Form.Group controlId="crudType">
                        <Form.Label >CRUD Type: {crud}</Form.Label>
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4}>
                    <Form.Group controlId="ticketName">
                        <Form.Label >Ticket Name</Form.Label>
                        <Form.Control type="ticketName" placeholder="Enter Ticket Name" />
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <Form.Group controlId="ticketDescription">
                        <Form.Label >Issue Description</Form.Label>
                        <Form.Control type="ticketDescription" as="textarea" rows={2} placeholder="Enter Ticket Description" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={4}>
                    <Form.Group controlId="severity">
                        <Form.Label >Severity</Form.Label>
                        <Form.Control as="select">
                            <option>Choose...</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4}>
                    <Form.Group controlID="applicationName">
                        <Form.Label >Application</Form.Label>
                        <Form.Control as="select">
                            <option>Choose...</option>
                            <option>Test</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4} >
                    <Form.Group controlID="developerAssigned">
                        <Form.Label >Developer Assigned</Form.Label>
                        <Form.Control type="developer" readOnly defaultValue="Filled Based on App Selected" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={6}>
                    <Form.Group controlId="dateCreated">
                        <Form.Label >Date Created</Form.Label>
                        <Form.Control readOnly defaultValue="Function for Current Date" />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlID="dueDate">
                        <Form.Label >Due Date</Form.Label>
                        <Form.Control readOnly defaultValue="Based on Severity" />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlID="applicationName">
                        <Form.Label >User Name</Form.Label>
                        <Form.Control readOnly defaultValue="Fill in User That Logged Ticket" />
                    </Form.Group>
                </Col>
            </Row>
        </Form >
    )
}

export default TicketForm