import React from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'

function TicketForm() {
    const { crud, id } = useParams()

    return (
        <Form>
            <h1> Ticket Form</h1>
            <p>Ticket #: {id}</p>
            <p>Type: {crud}</p>

            <Form.Group>
                <Form.Label column sm="2">
                    Ticket #
                </Form.Label>
                <Col sm="10">
                    <Form.Control plaintext readOnly defaultValue={id} />
                </Col>
            </Form.Group>

            <Form.Group>
                <Form.Label column sm="2">
                    Ticket #
                    </Form.Label>
                <Col sm="10">
                    <Form.Control plaintext readOnly defaultValue={id} />
                </Col>
            </Form.Group>
        </Form>
    )
}

export default TicketForm