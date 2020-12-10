/* eslint-disable react/prop-types */
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import React from 'react'
import './App.css'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Container fluid>
        <TicketTableParent />
        <Home />
      </Container>
    </Router>
  )
}

// Top Navigation Bar
// Link, Switch and Route Path are React Router for SPA Style Pages
function NavigationBar() {
  return (
    <Router>
      <Navbar bg="primary" expand="lg">
        <Navbar.Brand as={Link} to="/Home"><h3>Bug Tracker</h3></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/Developers" >Developers</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link as={Link} to="/Applications">Applications</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Switch>
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
  )
}

function Home() {
  return (
    <Router>
      <NavigationBar />
      <TicketTable />
      <h1>Home</h1>
    </Router>
  )
}

function Developers() {
  return (
    <h1>Developers</h1>
  )
}

function Applications() {
  return (
    <h1>Applications</h1>
  )
}

function TicketTableParent() {
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
      <TicketTable headers={Object.keys(schema)} rows={tableData} />
    </div>
  )
}

const TicketTable = (props) => {
  const { headers, rows } = props;
  return (
    <Table striped bordered hover responsive="md">
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
