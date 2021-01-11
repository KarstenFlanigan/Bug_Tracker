import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
//Custom hook that handles all fields typed 
import { useFormFields } from '../Libs/hooksLib'


function TicketForm() {
    const { crud, id } = useParams()
    const [fields, handleFieldChange] = useFormFields({})

    console.log(`Ticket Form Fields : ${JSON.stringify(fields)}`)

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
                        <Form.Control type="ticketName" placeholder="Enter Ticket Name" onChange={handleFieldChange} />
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <Form.Group controlId="ticketDescription">
                        <Form.Label >Issue Description</Form.Label>
                        <Form.Control type="ticketDescription" as="textarea" rows={2} placeholder="Enter Ticket Description" onChange={handleFieldChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={4}>
                    <Form.Group controlId="severity">
                        <Form.Label >Severity</Form.Label>
                        <Form.Control as="select" onChange={handleFieldChange}>
                            <option>Choose...</option>
                            <option>Low</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4}>
                    <Form.Group controlId="applicationName">
                        <Form.Label >Application</Form.Label>
                        <Form.Control as="select" onChange={handleFieldChange}>
                            <option>Choose...</option>
                            <option>Test</option>
                            <option>Medium</option>
                            <option>High</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4} >
                    <Form.Group controlId="developerAssigned">
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
                    <Form.Group controlId="dueDate">
                        <Form.Label >Due Date</Form.Label>
                        <Form.Control readOnly defaultValue="Based on Severity" />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlId="applicationName">
                        <Form.Label >User Name</Form.Label>
                        <Form.Control readOnly defaultValue="Fill in User That Logged Ticket" />
                    </Form.Group>
                </Col>
            </Row>

        </Form >
    )
}

export default TicketForm