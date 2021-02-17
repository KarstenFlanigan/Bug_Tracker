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
            "ticketStatus": "",
            "userName": "",
            "dateCreated": "",
            "developerAssigned": "",
            "ticketName": "",
            "ticketDescription": "",
            "severity": "",
            "dueDate": "",
        }
    )

    let severityObj = { "Choose...": "", "High": "", "Medium": "", "Low": "" }

    const [currentDate] = useState(new Date())
    const [missingValue, setmissingValue] = useState(true)
    const [missingValueArray, setmissingValueArray] = useState([])
    const [getAPIStatus, setgetAPIStatus] = useState()
    const [apiLoading, setapiLoading] = useState(true)
    const [developerArray, setdeveloperArray] = useState()
    const [applicationArray, setapplicationArray] = useState()
    const [ticketName, setticketName] = useState(fields["ticketName"])
    const [dateCreated, setdateCreated] = useState(fields["dateCreated"])
    const [dueDate, setdueDate] = useState(fields["dueDate"])
    const [userName, setuserName] = useState(fields["userName"])

    useEffect(() => {
        //console.log(`MissingValueArray ${missingValueArray}`)
        //console.log(`MissingValue ${missingValue}`)
        //console.log(`Ticket Form Fields : ${JSON.stringify(fields)}`)
    })

    //Call all Get APIs
    useEffect(() => {
        if (crud == "update") {
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
                        let dueDateFormat = new Date(result[0].dateDue)
                        fields.dueDate = dueDateFormat
                        let dateCreatedFormat = new Date(result[0].dateCreated)
                        fields.dateCreated = dateCreatedFormat
                        fields.developerAssigned = result[0].developer.developerID
                        fields.applicationName = result[0].application.applicationID
                        fields.ticketStatus = result[0].status
                        setuserName(fields.userName)

                        //Doing this so there is a re-render and the fields constant values are displayed in form
                        setticketName(fields.ticketName)
                        setdateCreated(fields.currentDate)
                        setdueDate(fields.dueDate)

                        console.log(result)
                    },
                    (error) => {
                        setgetAPIStatus(error)
                        console.log(`Failed: ${getAPIStatus}`)
                    }
                )
        }
        fetch(`http://localhost:55306/api/developers`)
            .then(res => res.json())
            .then(
                (result) => {
                    setgetAPIStatus(result)
                    setdeveloperArray(result)
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
                    setapplicationArray(result)
                    setapiLoading(false)
                },
                (error) => {
                    setapiLoading(false)
                    setgetAPIStatus(error)
                    console.log(`Failed: ${getAPIStatus}`)
                }
            )

        if (!crud == "update") {
            fields.userName = "Test User"
            setuserName(fields.userName)
        }
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
        fields.dueDate = dueDate

        setdueDate(fields.dueDate)

        //Adds Severity to handlefieldchange hook
        handleFieldChange(event)
    }
    /*
    CHANGE MISSINGV VALUE CHECK FROM CHECKING KEY TO CHECKING VALUE FOR ""
    */
    //COMPARE ARRAY OF OBJECTS OF EXPECTED VS WHAT WAS ENTERED IN STATE
    const handleSubmit = () => {
        let missingValArray = []

        //Compare to see if keys(fields) exist
        //if they don't exist push missing key(field) to array which updates state array
        for (const prop in fields) {
            if (fields[prop] == "" || null) {
                missingValArray.push(prop)
            }
        }
        setmissingValueArray(missingValArray)

        //if there are any missing fields, change the missing value state to trigger alert
        //if no missing fields set missing state to false and send alert
        if (missingValArray.length > 0) {
            setmissingValue(true)
        } else {
            setmissingValue(false)
        }

        console.log(`Submit Fields: ${JSON.stringify(fields)}`)
        console.log(`Missing Value Array: ${JSON.stringify(missingValueArray)}`)
        console.log(`Missing Value ${missingValue}`)
    }

    return (
        <div>
            {
                apiLoading && crud == "update" ?
                    showSpinner()
                    :
                    < Form >
                        {showAlert()}

                        < Row >
                            <Col lg={4}>
                                <Form.Group controlId="ticketNumber">
                                    <Form.Label >Ticket #: {crud == "update" ? id : null}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group controlId="crudType">
                                    <Form.Label >CRUD Type: {crud}</Form.Label>
                                </Form.Group>
                            </Col>
                            <Col lg={4}>
                                <Form.Group controlId="ticketStatus">
                                    <Form.Label>Ticket Status</Form.Label>
                                    <Form.Control as="select" value={fields["ticketStatus"]} onChange={handleFieldChange}>
                                        <option>Choose...</option>
                                        <option>Open</option>
                                        <option>Closed</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row >

                        <Row>
                            <Col lg={4}>
                                <Form.Group controlId="ticketName">
                                    <Form.Label >Ticket Name</Form.Label>
                                    <Form.Control placeholder="Enter Ticket Name" onChange={handleFieldChange} defaultValue={ticketName} />
                                </Form.Group>
                            </Col>
                            <Col lg={8}>
                                <Form.Group controlId="ticketDescription">
                                    <Form.Label >Issue Description</Form.Label>
                                    <Form.Control as="textarea" rows={2} placeholder="Enter Ticket Description" onChange={handleFieldChange} defaultValue={fields["ticketDescription"]} />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} md={4}>
                                <Form.Group controlId="severity">
                                    <Form.Label >Severity</Form.Label>
                                    <Form.Control as={crud == "update" ? "textarea" : "select"} onChange={handleSeverity} value={crud == "update" ? fields["severity"] : null} readOnly={crud == "update" ? true : false}>

                                        {
                                            crud == "update" ?
                                                null
                                                :
                                                Object.keys(severityObj).map((value, key) => {
                                                    return (
                                                        <option key={key}>{value}</option>
                                                    )
                                                })
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={4}>
                                <Form.Group controlId="applicationName">
                                    <Form.Label >Application</Form.Label>
                                    <Form.Control as="select" onChange={handleFieldChange} value={fields["applicationName"]}>
                                        {
                                            crud == "update" ?
                                                null
                                                :
                                                <option>Choose...</option>
                                        }

                                        {
                                            applicationArray && fields ?
                                                applicationArray.map((value, key) => {
                                                    return (
                                                        <option value={value.applicationID} key={key}>
                                                            {`${value.applicationName}`}
                                                        </option>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={4} >
                                <Form.Group controlId="developerAssigned">
                                    <Form.Label >Developer Assigned</Form.Label>
                                    <Form.Control as="select" onChange={handleFieldChange} value={fields["developerAssigned"]}>
                                        {
                                            crud == "update" ?
                                                null
                                                :
                                                <option>Choose...</option>
                                        }
                                        {
                                            developerArray && fields ?
                                                developerArray.map((value, key) => {
                                                    return (
                                                        <option value={value.developerID} key={key}>
                                                            {`${value.developerFirstName} ${value.developerLastName}`}
                                                        </option>
                                                    )
                                                })
                                                :
                                                null
                                        }
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} md={6}>
                                <Form.Group controlId="dateCreated">
                                    <Form.Label >Date Created</Form.Label>
                                    <Form.Control readOnly defaultValue={crud == "update" && dateCreated ? dateCreated.toDateString() : currentDate.toDateString()} />
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} >
                                <Form.Group controlId="dueDate">
                                    <Form.Label >Due Date</Form.Label>
                                    <Form.Control defaultValue={dueDate ? dueDate.toDateString() : null} onChange={handleFieldChange} readOnly />
                                </Form.Group>
                            </Col>
                            <Col lg={4} md={6} >
                                <Form.Group controlId="userName">
                                    <Form.Label >User Name</Form.Label>
                                    <Form.Control value={userName && !apiLoading ? userName : null} onChange={handleFieldChange} readOnly />
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