/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import ListGroup from 'react-bootstrap/ListGroup'

//import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, withRouter, BrowserRouter } from 'react-router-dom'

function TableType() {

  const [tableData, settableData] = useState()

  useEffect(async () => {
    let response = await fetch(`http://localhost:55306/api/tickets`)

    //Response.ok will be true if successfull message returned
    if (response.ok) {
      console.log(`Success: ${response.ok} ${response.status}`)
      let jsonData = await response.json()
      let tickets = []

      for (const prop in jsonData) {
        let devFName = jsonData[prop].developer.developerFirstName
        let devLName = jsonData[prop].developer.developerLastName
        let devName = `${devFName} ${devLName}`
        tickets.push({
          "Ticked ID": jsonData[prop].ticketID,
          "Ticket Name": jsonData[prop].ticketName,
          "Status": jsonData[prop].status,
          "Application": jsonData[prop].application.applicationName,
          "Severity": jsonData[prop].severity,
          "Developer": devName
        })
      }
      settableData(tickets)
    }
    else {
      console.log(`Failure: ${response.ok} ${response.status}`)
    }
  }, [])

  if (!tableData) {
    return (
      <Spinner animation="border" role="status" size="xl">
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  console.log(tableData)

  //Passed in prop from parent of tabletype defining what view(s) to use Ex:(developer)
  const tableType = "ticket"

  //For Table Headers, define what headers we want to see
  const tableHeaders =
  {
    "Ticked ID": "",
    "Ticket Name": "",
    "Status": "",
    "Application": "",
    "Severity": "",
    "Developer": ""
  }


  const filterCriteria =
  {
    "Status": "",
    "Application": "",
    "Severity": "",
    "Developer": ""
  }

  return (
    <TableView headers={Object.keys(tableHeaders)} filterCriteria={filterCriteria} tableData={tableData} tableType={tableType} />
  )
}

//Headers passed in from parent TableType
//Table Data for rows passed into TableBody by Filter component, since filter will modify the rows displayed
const TableView = (props) => {
  const { headers, filterCriteria, tableData, tableType } = props;
  //Pass filter name key as prop
  return (
    <TableToolBar tableData={tableData} filterCriteria={filterCriteria} headers={headers} tableType={tableType} />
  )
}

const TableToolBar = (props) => {
  const { tableData = { tableData }, filterCriteria = { filterCriteria }, headers = { headers }, tableType = { tableType } } = props
  return (
    <FilterButton tableData={tableData} filterCriteria={filterCriteria} headers={headers} tableType={tableType} />
  )
}

const FilterButton = (props) => {
  const { tableData = { tableData }, filterCriteria = { filterCriteria }, headers = { headers }, tableType = { tableType } } = props
  const [filterColumnStatus, setfilterColumnStatus] = useState(false)
  const [filterStatus, setfilterStatus] = useState(false)
  const [filterColumn, setfilterColumn] = useState()
  const [filterValue, setfilterValue] = useState()
  const [updatedTableData, setUpdatedTableData] = useState(tableData)
  const history2 = useHistory()

  const handleClick = (filterColumnClicked) => {
    setfilterColumnStatus(!filterColumnStatus)
    setfilterColumn(filterColumnClicked)
  }

  //Display All Column Filter Options passed in as Props from Parent 
  //Send column filter clicked to handleclick and then to child component
  const buildFilterColumnDropdown = () => {
    return (
      Object.keys(filterCriteria).map((value, index) => {
        return (
          <Dropdown.Item key={index} onClick={() => handleClick(value)} >
            {value}
          </Dropdown.Item>
        )
      })
    )
  }

  const buildFilterValueDropdown = () => {
    //Get unique filter values from passed in filter name that was chosen from table's data
    const uniqueFilterKeyValues = [...new Set(tableData.map(value => value[filterColumn]))]

    return (
      uniqueFilterKeyValues.map((value, index) => {
        return (
          <Dropdown.Item key={index} onClick={() => handleClick2(value)} >
            {value}
          </Dropdown.Item >
        )
      })
    )
  }

  //After choosing what to filter by
  const handleClick2 = (dropDownValue) => {
    setfilterValue(dropDownValue)
    setfilterStatus(!filterStatus)
    console.log(`Filter Column: ${filterColumn}`)
    console.log(`Filter Value: ${filterValue}`)
    filterStatus ?
      setUpdatedTableData(tableData)
      :
      setUpdatedTableData(tableData.filter(row => row[filterColumn] === dropDownValue))

  }

  //Clear button resets both states to negative
  const handleClick3 = () => {
    setfilterColumnStatus(!filterColumnStatus)
    setfilterStatus(!filterStatus)
    filterStatus ?
      setUpdatedTableData(tableData)
      :
      setUpdatedTableData(tableData.filter(row => row[filterColumn] === filterValue))
  }


  //Displaying buttons based on state updates from the handleClick methods
  return (
    <div>
      <ListGroup horizontal >
        <ListGroup.Item>
          {
            !filterColumnStatus && !filterStatus ?
              <Dropdown>
                <Dropdown.Toggle variant="success">
                  Choose Column Filter
              </Dropdown.Toggle>
                <Dropdown.Menu>
                  {buildFilterColumnDropdown()}
                </Dropdown.Menu>
              </Dropdown>
              : filterColumnStatus && !filterStatus ?
                <Dropdown>
                  <Dropdown.Toggle variant="success">
                    Filter By {filterColumn}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {buildFilterValueDropdown()}
                  </Dropdown.Menu>
                </Dropdown>
                :
                <Button variant="success" size="md" onClick={() => handleClick3()}>Clear {filterColumn} Filter</Button>
          }
        </ListGroup.Item>
        <ListGroup.Item>
          <Button variant="success" onClick={() => history2.push(`${tableType}/create`)} >
            Create Ticket
          </Button>
        </ListGroup.Item>
      </ListGroup>
      <TableHeader tableData={updatedTableData} filterCriteria={filterCriteria} headers={headers} tableType={tableType} />
    </div>
  )
}

const TableHeader = (props) => {

  const { headers, tableData, tableType } = props;
  const [headerSort, setheaderSort] = useState();
  const [sortStatus, setsortStatus] = useState(false);


  //sends the table header column name clicked to be sorted
  //changes the table header column to be sorted by ascending or descending
  const handleClick = (headerClicked) => {
    setheaderSort(headerClicked)
    setsortStatus(!sortStatus)
  }

  return (

    <Table striped bordered hover responsive="md" >
      <thead className="thead-dark" key="header-1">
        <tr key="header-0">
          {headers && headers.map((value, index) => {
            return <th key={index} onClick={() => handleClick(value)}><div>{value}</div></th>
          })}
        </tr>
      </thead>
      <TableBody rows={tableData} headers={headers} sortField={headerSort} sortBy={sortStatus} tableType={tableType}></TableBody>
    </Table>
  )
}

const TableBody = (props) => {
  const { headers, rows, sortField, sortBy, tableType } = props;
  //on click of tr (tablerow) display the form for the row clicked
  const history = useHistory()
  //Primary Key of row used for unique row values and to view ticketdata
  let trKey = "Ticked ID"

  const handleClick = (rowID) => history.push(`${tableType}/update/${rowID}`)

  //If true sort by ascending or if false sort by descending, column header to sort is passed by parent component
  sortBy ?
    rows.sort((a, b) => a[sortField] > b[sortField] ? 1 : -1)
    :
    rows.sort((a, b) => a[sortField] > b[sortField] ? -1 : 1)

  //trKey is passed in by the highest component
  function buildRow(row, headers) {
    return (
      <tr key={row[trKey]} onClick={() => handleClick(row[trKey])}>
        {
          headers.map((value, index) => {
            return <td key={index}>{row[value]}</td >
          })
        }
      </tr >
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

export default TableType;
