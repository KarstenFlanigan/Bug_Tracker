import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'


function TicketForm() {
    const { crud, id } = useParams()

    return (
        <Form>
            <Form.Group controlId="ticketNumber">
                <Form.Label>Ticket #: {id}</Form.Label>
            </Form.Group>
            <Form.Group controlId="crudType">
                <Form.Label>CRUD Type: {crud}</Form.Label>
            </Form.Group>
            <Form.Group controlId="ticketName">
                <Form.Label>Ticket Name</Form.Label>
                <Form.Control type="ticketName" placeholder="Enter Ticket Name" />
            </Form.Group>
            <Form.Group controlId="ticketDescription">
                <Form.Label>Ticket Description</Form.Label>
                <Form.Control type="ticketDescription" as="textarea" rows={2} placeholder="Enter Ticket Description" />
            </Form.Group>

            <Form.Row>
                <Form.Group controlId="severity">
                    <Form.Label as={Col} mx="5">Severity</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlID="applicationName">
                    <Form.Label as={Col}>Application</Form.Label>
                    <Form.Control as="select">
                        <option>Choose...</option>
                        <option>Test</option>
                        <option>Medium</option>
                        <option>High</option>
                    </Form.Control>
                </Form.Group>
            </Form.Row>
        </Form>
    )
}

export default TicketForm