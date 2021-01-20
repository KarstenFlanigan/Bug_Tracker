import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
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
    const [developerAssigned, setdeveloperAssigned] = useState()
    const [missingValue, setmissingValue] = useState(false)
    const [missingValueArray, setmissingValueArray] = useState([])

    //Listing all expected Form Keys to do comparision when submitted
    const compareJSON = { "dueDate": "", "userName": "", "severity": "", "dateCreated": "", "developerAssigned": "", "ticketName": "", "ticketDescription": "", "applicationName": "" }

    useEffect(() => {
        //console.log(`Ticket Form Fields : ${JSON.stringify(fields)}`)
        console.log(`MissingValueArray ${missingValueArray}`)
    })

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


    const handleApplicationName = (event) => {

        //Adds Severity to handlefieldchange hook
        handleFieldChange(event)

        /* 
        ADD LOGIC FOR WHEN APP IS CHOSEN TO ASSIGN TO DESIGNATED DEVELOPER
        */

        //let appChosen = JSON.stringify(event.target.id)

        setdeveloperAssigned("Test Application Name")

        //New event to trigger applicationName OnChange which will add applicationName state to the useformfields custom hook
        let newEvent = new Event("input", { "bubbles": true })
        let element = document.getElementById("developerAssigned")
        element.dispatchEvent(newEvent)
    }

    //FIX THIS
    //COMPARE ARRAY OF OBJECTS OF EXPECTED VS WHAT WAS ENTERED IN STATE
    const handleSubmit = () => {
        let formJSON = JSON.stringify(fields)
        let valArray = []
        //console.log(`formJson : ${formJSON}`)

        Object.keys(compareJSON).map((value) => {
            formJSON.includes(value) ?
                null
                :
                valArray.push(value)
        })

        setmissingValueArray(valArray)


        missingValueArray.length > 0 ?
            setmissingValue(!missingValue)
            :
            console.log("No Missing Values")
    }

    return (
        <Form>
            {
                missingValue ?
                    <Alert variant="danger">
                        <Alert.Heading as="h4">Please Fill</Alert.Heading>
                        {
                            missingValueArray.map((value, index) => {
                                return (
                                    <p key={index}>
                                        {value}
                                    </p>
                                )
                            })
                        }
                    </Alert>
                    :
                    null
            }

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
                        <Form.Control as="select" onChange={handleApplicationName}>
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
                        <Form.Control readOnly defaultValue={developerAssigned} onChange={handleFieldChange} />
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
                <Col xs={6}>
                    <Form.Group>
                        <Button onClick={() => handleSubmit()}>
                            Submit
                        </Button>
                    </Form.Group>
                </Col>
                <Col xs={6}>
                    <Form.Group>
                        <Button onClick={(() => history.push("/home"))}>
                            Cancel
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
        </Form >
    )
}

export default TicketForm