import React, { useState, useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, useParams, withRouter } from 'react-router-dom'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
//Custom hook that handles all fields typed 
import { useFormFields } from '../Libs/CustomHooks.js'


function TicketForm() {
    //CRUD and ID sent from TableType Component
    const { crud, id } = useParams()
    const history = useHistory()
    //Setting dateCreated and user form control values explicitly
    const [fields, handleFieldChange] = useFormFields(
        {
            "userName": "",
            "dateCreated": "",
            "developerAssigned": "",
            "ticketName": "",
            "ticketDescription": "",
            "severity": "",
            "dueDate": ""
        }
    )

    const [currentDate] = useState(new Date())
    const [missingValue, setmissingValue] = useState(true)
    const [missingValueArray, setmissingValueArray] = useState([])
    const [getAPIStatus, setgetAPIStatus] = useState()
    const [apiLoading, setapiLoading] = useState(true)
    let developerArray = []
    let applicationArray = []
    const [developerName, setdeveloperName] = useState()

    //Listing all expected Form Keys to do comparision when submitted
    const compareJSON = { "userName": "", "severity": "", "dateCreated": "", "developerAssigned": "", "ticketName": "", "ticketDescription": "" }

    useEffect(() => {
        //console.log(`MissingValueArray ${missingValueArray}`)
        //console.log(`MissingValue ${missingValue}`)
        console.log(`Ticket Form Fields : ${JSON.stringify(fields)}`)

        if (!apiLoading) {
            //New event to trigger applicationName OnChange which will add applicationName state to the useformfields custom hook
            let newEvent = new Event("input", { "bubbles": true })
            let element2 = document.getElementById("developerAssigned")
            element2.dispatchEvent(newEvent)
        }
        /*
        CHANGE API AFTER BUILT
        */
        //Calling API best on CRUD type, attached to handleSubmit
        if (missingValueArray == 0 && missingValue === false && crud == "update") {

            console.log("Calling API")


        }
    })

    //Call all Get APIs
    useEffect(() => {
        fetch(`http://localhost:55306/api/tickets/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setgetAPIStatus(result)
                    setapiLoading(false)
                    fields.ticketName = result[0].ticketName
                    fields.ticketDescription = result[0].ticketDescription
                    fields.severity = result[0].severity
                    fields.userName = result[0].userName
                    fields.dueDate = result[0].dueDate
                    fields.dateCreated = result[0].dateCreated
                    let developerFirstName = result[0].developer.developerFirstName
                    let developerLastName = result[0].developer.developerLastName
                    let devName = `${developerFirstName} ${developerLastName}`
                    setdeveloperName(devName)
                },
                (error) => {
                    setgetAPIStatus(error)
                    console.log(`Failed: ${getAPIStatus}`)
                }
            )

        fetch(`http://localhost:55306/api/developers`)
            .then(res => res.json())
            .then(
                (result) => {
                    setgetAPIStatus(result)
                    developerArray = result
                    console.log(developerArray.map(x => x))
                    setapiLoading(false)
                },
                (error) => {
                    setgetAPIStatus(error)
                    console.log(`Failed: ${getAPIStatus}`)
                }
            )

        fetch(`http://localhost:55306/api/applications`)
            .then(res => res.json())
            .then(
                (result) => {
                    setgetAPIStatus(result)
                    applicationArray = result
                    console.log(applicationArray.map(x => x))
                    setapiLoading(false)
                },
                (error) => {
                    setapiLoading(false)
                    setgetAPIStatus(error)
                    console.log(`Failed: ${getAPIStatus}`)
                }
            )
    }, [])

    const showSpinner = () => {
        return (
            <Spinner animation="border" role="status" size="xl">
                <span className="sr-only">Loading...</span>
            </Spinner>
        )
    }

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
        } else {
            dueDate = null
        }

        //Setting date based on logic
        fields.dueDate = dueDate;

        //Adds Severity to handlefieldchange hook
        handleChange(event)
    }

    const handleApplicationName = (event) => {
        /* 
        ADD LOGIC FOR WHEN APP IS CHOSEN TO ASSIGN TO DESIGNATED DEVELOPER
        */

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
        <div>
            {
                apiLoading ?
                    showSpinner()
                    :
                    < Form >
                        {showAlert()}
                        < Row >
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
                        </Row >

                        <Row>
                            <Col lg={4}>
                                <Form.Group controlId="ticketName">
                                    <Form.Label >Ticket Name</Form.Label>
                                    <Form.Control placeholder="Enter Ticket Name" onChange={handleChange} defaultValue={!apiLoading && crud == "update" ? null : null} />
                                </Form.Group>
                            </Col>
                            <Col lg={8}>
                                <Form.Group controlId="ticketDescription">
                                    <Form.Label >Issue Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} placeholder="Enter Ticket Description" onChange={handleChange} defaultValue={crud == "update" && !apiLoading ? fields["ticketDescription"] : null} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} md={4}>
                                <Form.Group controlId="severity">
                                    <Form.Label >Severity</Form.Label>
                                    <Form.Control as="select" onChange={handleSeverity} defaultValue={crud == "update" && !apiLoading ? fields["severity"] : null} readOnly={crud == "update" ? true : false}>
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
                                    <Form.Control defaultValue={!apiLoading && crud == "update" ? developerName : null} onChange={handleChange} readOnly />
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
                                        defaultValue={fields["dueDate"] ? fields["dueDate"] : null}
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
            }
        </div >
    )
}

export default TicketForm