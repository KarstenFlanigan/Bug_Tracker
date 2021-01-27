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
            "userName": "Test User",
            "dateCreated": "delete after api"
        }
    )
    const [dateDue, setdateDue] = useState()
    const [currentDate] = useState(new Date())
    const [developerAssigned, setdeveloperAssigned] = useState()
    const [missingValue, setmissingValue] = useState(true)
    const [missingValueArray, setmissingValueArray] = useState([])

    //Listing all expected Form Keys to do comparision when submitted
    const compareJSON = { "userName": "", "severity": "", "dateCreated": "", "developerAssigned": "", "ticketName": "", "ticketDescription": "" }

    useEffect(() => {
        //console.log(`MissingValueArray ${missingValueArray}`)
        //console.log(`MissingValue ${missingValue}`)
        //console.log(`Ticket Form Fields : ${JSON.stringify(fields)}`)

        //New event to trigger dueDate's OnChange which will add dueDate state to the useformfields custom hook
        let secondEvent = new Event("input", { "bubbles": true })
        let element = document.getElementById("dueDate")
        element.dispatchEvent(secondEvent)

        //New event to trigger applicationName OnChange which will add applicationName state to the useformfields custom hook
        let newEvent = new Event("input", { "bubbles": true })
        let element2 = document.getElementById("developerAssigned")
        element2.dispatchEvent(newEvent)

        /*
        CHANGE API AFTER BUILT
        */
        //Calling API best on CRUD type, attached to handleSubmit
        if (missingValueArray == 0 && missingValue === false && crud == "update") {

            console.log("Calling API")

            fetch("/test/api", {
                method: "POST",
                body: JSON.stringify(fields),
                headers: { "Content-Type": "application/json" },
            })
                .then((res => res.json()))
                .then(data => {
                    console.log("API Success: " + data)
                })
                .catch((error => {
                    console.log("API Error: " + error)
                }))
        }
    })

    const showAlert = () => {
        return (
            <Alert variant="danger" show={missingValue && missingValueArray.length > 0 ? true : false}>
                <Alert.Heading><h4>Please Fill</h4></Alert.Heading>
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
        )
    }

    //Handle Change which calls the custom hook
    const handleChange = (event) => {
        handleFieldChange(event)
    }

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

        //Setting date based on logic
        setdateDue(dueDate)

        //Adds Severity to handlefieldchange hook
        handleChange(event)
    }

    const dueDateValue = () => {
        if (crud == "update") {
            fields["dueDate"]
        } else if (dateDue) {
            dateDue.toDateString()
        }
    }

    const handleApplicationName = (event) => {
        /* 
        ADD LOGIC FOR WHEN APP IS CHOSEN TO ASSIGN TO DESIGNATED DEVELOPER
        */
        setdeveloperAssigned("Test Application Name")
        //Adds applicationName to handlefieldchange hook
        handleChange(event)
    }

    //COMPARE ARRAY OF OBJECTS OF EXPECTED VS WHAT WAS ENTERED IN STATE
    const handleSubmit = () => {
        let formJSON = JSON.stringify(fields)
        let valArray = []

        //Compare to see if keys(fields) exist
        //if they don't exist push missing key(field) to array which updates state array
        Object.keys(compareJSON).map((value) => {
            formJSON.includes(value) ?
                null
                :
                valArray.push(value)
        })

        setmissingValueArray(valArray)

        //if there are any missing fields, change the missing value state to trigger alert
        //if no missing fields set missing state to false and send alert
        if (valArray.length > 0) {
            setmissingValue(true)
        } else {
            setmissingValue(false)
        }

        //console.log(`Submit Fields: ${JSON.stringify(fields)}`)
        //console.log(`Missing Value Array: ${JSON.stringify(missingValueArray)}`)
        console.log(`Missing Value ${missingValue}`)
    }

    return (
        <Form>
            {showAlert()}
            <Row>
                <Col lg={6}>
                    <Form.Group controlId="ticketNumber">
                        <Form.Label >Ticket #: {crud == "update" ? id : null}</Form.Label>
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
                        <Form.Control placeholder="Enter Ticket Name" onChange={handleChange} defaultValue={crud == "update" ? fields["ticketName"] : null} />
                    </Form.Group>
                </Col>
                <Col lg={8}>
                    <Form.Group controlId="ticketDescription">
                        <Form.Label >Issue Description</Form.Label>
                        <Form.Control as="textarea" rows={2} placeholder="Enter Ticket Description" onChange={handleChange} defaultValue={crud == "update" ? fields["ticketDescription"] : null} />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={4}>
                    <Form.Group controlId="severity">
                        <Form.Label >Severity</Form.Label>
                        <Form.Control as="select" onChange={handleSeverity} defaultValue={crud == "update" ? fields["severity"] : null} readOnly={crud == "update" ? true : false}>
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
                        <Form.Control as="select" onChange={handleApplicationName} readOnly={crud == "update" ? true : false}>
                            <option>Choose...</option>
                            <option>Bug Tracker</option>
                            <option>QA App</option>
                            <option>Sputnik</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col lg={4} md={4} >
                    <Form.Group controlId="developerAssigned">
                        <Form.Label >Developer Assigned</Form.Label>
                        <Form.Control defaultValue={developerAssigned ? developerAssigned : null} onChange={handleChange} readOnly />
                    </Form.Group>
                </Col>
            </Row>

            <Row>
                <Col lg={4} md={6}>
                    <Form.Group controlId="dateCreated">
                        <Form.Label >Date Created</Form.Label>
                        <Form.Control readOnly defaultValue={crud == "update" ? fields["dateCreated"] : currentDate.toDateString()} />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlId="dueDate">
                        <Form.Label >Due Date</Form.Label>
                        <Form.Control
                            defaultValue={dueDateValue()}
                            onChange={handleChange}
                            readOnly
                        />
                    </Form.Group>
                </Col>
                <Col lg={4} md={6} >
                    <Form.Group controlId="userName">
                        <Form.Label >User Name</Form.Label>
                        <Form.Control readOnly defaultValue="Fill in User That Logged Ticket" onChange={handleChange} />
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