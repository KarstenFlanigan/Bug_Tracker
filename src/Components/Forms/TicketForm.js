import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
//Custom hook that handles all fields typed 
import { useFormFields } from '../Libs/CustomHooks.js'


function TicketForm() {
    //CRUD and ID sent from TableType Component
    const { crud, id } = useParams()
    const history = useHistory()
    //Setting dateCreated and user form control values explicitly
    const [fields, handleFieldChange] = useFormFields(
        {
            "dateCreated": new Date().toDateString(),
            "userName": "Test User"
        }
    )
    const [dateDue, setdateDue] = useState()
    const [currentDate] = useState(new Date())

    useEffect(() => { console.log(`Ticket Form Fields : ${JSON.stringify(fields)}`) })

    //Handle when severity is chosen
    const handleSeverity = (event) => {

        let High = `"High"`
        let Medium = `"Medium"`
        let Low = `"Low"`
        let Severity = JSON.stringify(event.target.value)
        let dueDate = new Date()

        if (Severity == High) {
            dueDate.setDate(dueDate.getDate() + 1)
        } else if (Severity == Medium) {
            dueDate.setDate(dueDate.getDate() + 5)
        } else if (Severity == Low) {
            dueDate.setDate(dueDate.getDate() + 10)
        }
        //Adds Severity to handlefieldchange hook
        handleFieldChange(event)

        //Setting date based on logic
        setdateDue(dueDate)

        //New event to trigger dueDate's OnChange which will add dueDate state to the useformfields custom hook
        let newEvent = new Event("input", { "bubbles": true })
        let element = document.getElementById("dueDate")
        element.dispatchEvent(newEvent)
    }

    const handleSubmit = () => {
        let formJSON = JSON.stringify(fields)
        console.log(`formJSON: ${formJSON}`)
    }

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
                        <Form.Control placeholder="Enter Ticket Name" onChange={handleFieldChange} />
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <Form.Group controlId="ticketDescription">
                        <Form.Label >Issue Description</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Ticket Description" onChange={handleFieldChange} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={4}>
                    <Form.Group controlId="severity">
                        <Form.Label >Severity</Form.Label>
                        <Form.Control as="select" onChange={handleSeverity}>
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
                        <Form.Control readOnly defaultValue={currentDate.toDateString()} />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlId="dueDate">
                        <Form.Label >Due Date</Form.Label>
                        <Form.Control
                            defaultValue={dateDue ? dateDue.toDateString() : null}
                            onChange={handleFieldChange}
                            readOnly
                        />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlId="userName">
                        <Form.Label >User Name</Form.Label>
                        <Form.Control readOnly defaultValue="Fill in User That Logged Ticket" />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col xs={4}>
                    <Form.Group>
                        <Button onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <Form.Group>
                        <Button type="reset">
                            Clear
                        </Button>
                    </Form.Group>
                </Col>
                <Col xs={4}>
                    <Form.Group>
                        <Button type="reset" onClick={(() => history.push("/home"))}>
                            Cancel
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form >
    )
}

export default TicketForm