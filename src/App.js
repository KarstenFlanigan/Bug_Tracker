/* eslint-disable react/prop-types */
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

function App() {
  return (
    <Container fluid>
      <Router>
        <Navbar bg="primary" expand="lg">
          <Navbar.Brand as={Link} to="/home"><h3>Bug Tracker</h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav defaultActiveKey="/home" as="ul">
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/developers" >Developers</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link as={Link} to="/applications">Applications</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
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
        </Switch>
      </Router>
    </Container>
  )
}

function Home() {
  return (
    <div>
      <TableType />
    </div>
  )
}

function Developers() {
  return (
    <div>
      <h1>Developers</h1>
    </div>
  )
}

function Applications() {
  return (
    <div>
      <h1>Applications</h1>
    </div>
  )
}

function TableType() {
  //Will change to API returned JSON
  const tableData = [
    { id: 1, name: 'first ticket' },
    { id: 2, name: 'second ticket' },
    { id: 3, name: 'third ticket' },
    { id: 4, name: 'fourth ticket' }
  ]

  const schema =
  {
    id: "",
    name: ""
  }

  return (
    <div>
      <TableView headers={Object.keys(schema)} rows={tableData} />
    </div>
  )
}

const TableView = (props) => {
  const { headers, rows } = props;
  return (
    <Table striped bordered hover responsive="md">
      <TableFilter />
      <TableHeader headers={headers}></TableHeader>
      <TableBody headers={headers} rows={rows}></TableBody>
    </Table>
  )
}

const TableHeader = (props) => {
  const { headers } = props;

  return (
    <thead className="thead-dark" key="header-1">
      <tr key="header-0">
        {headers && headers.map((value, index) => {
          return <th key={index}><div>{value}</div></th>
        })}
      </tr>
    </thead>
  )
}

const TableBody = (props) => {
  const { headers, rows } = props;

  function buildRow(row, headers) {
    return (
      <tr key={row.id}>
        {headers.map((value, index) => {
          return <td key={index}>{row[value]}</td>
        })}
      </tr>
    )
  }
  return (
    <tbody>
      {rows && rows.map((value) => {
        return buildRow(value, headers)
      })}
    </tbody>
  )
}

//Need to pass in Filter Objects
const TableFilter = () => {
  const headers =
    [
      { id: "1", name: "james" },
      { id: "1", name: "chris" },
      { id: "1", name: "bob" }
    ];

  return (
    < Dropdown >
      <Dropdown.Toggle>
        Filter
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {headers.map((value, key) => {
          return <Dropdown.Item key={key} href="" >{value.name}</Dropdown.Item>
        })}
      </Dropdown.Menu>
    </Dropdown >
  )
}



/*
 
class TicketTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tickets: [
        { id: 1, name: 'first ticket' }
      ]
    }
  }
 
  getTableData() {
    // Make API Calls once APIs are built
    // API Call Code Here
    // API Call Code Here
    // MAKE SURE TO ADD ASYNC TO THIS FUNC AND AWAIT TO OTHER RECEIVING
    // MIGHT NEED TO USE STRINGIFY OR PARSE FOR THE JSON RETURNED
    const results = [
      { id: 1, name: 'first ticket' },
      { id: 2, name: 'second ticket' },
      { id: 3, name: 'third ticket' },
      { id: 4, name: 'fourth ticket' }
    ]
 
    console.log(results)
    return results
  }
 
  componentDidMount() {
    const ticketArray = this.getTableData()
 
    this.setState({
      tickets: ticketArray
    })
 
    // How do I access this.setstate.tickets
    // console.log(this.setState[tickets]);
  }
 
  renderTableData() {
    return this.state.tickets.map((ticket) => {
      const { id, name } = ticket
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
        </tr>
      )
    })
  }
 
  renderTableHeader() {
    // Only get first object since they will all have the same keys
    // from the API Call
    const header = Object.keys(this.state.tickets[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }
 
  render() {
    return (
      <Table striped bordered hover responsive="md">
        <tbody>
          <tr>{this.renderTableHeader()}</tr>
          {this.renderTableData()}
        </tbody>
      </Table>
 
    )
  }
}
*/

export default App
