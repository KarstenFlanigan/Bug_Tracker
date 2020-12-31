/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, withRouter, BrowserRouter } from 'react-router-dom'

function TableType() {

  //CREATE MULTI-FILTER OPTION, one for open/closed and then X

  //Passed in prop from parent of tabletype defining what view(s) to use Ex:(developer)
  const tableType = "ticket"

  //Use if then statement based on tabletype prop to determine what API to call to create table
  const tableData = [
    { id: 4, name: 'fourth ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 1, name: 'first ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 2, name: 'second ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 3, name: 'third ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "open" },
    { id: 5, name: 'first ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "open" }
  ]

  //For Table Headers, define what headers we want to see
  const tableHeaders =
  {
    id: "",
    status: "",
    name: "",
    developerName: "",
    application: "",
    dueDate: ""
  }

  //For Filter Component
  //Pass in to TableType component and then TableView
  const filterCriteria = { name: "" }
  /*
  const filterCriteria =
  {
    name: "",
    status: "",
    developerName: "",
    application: ""
  }
  */

  //Unique key for the HTML TR Key (Usually the primary key of the database table)
  //CHANGE NAME TO PRIMARY KEY?? USE THE PRIMARY KEY ID TO LINK TO FORM FOR CRUD?
  const trKey = "id"

  return (
    <div>
      <TableView headers={Object.keys(tableHeaders)} filterCriteria={Object.keys(filterCriteria)} tableData={tableData} trKey={trKey} tableType={tableType} />
    </div>
  )
}

//Headers passed in from parent TableType
//Table Data for rows passed into TableBody by Filter component, since filter will modify the rows displayed
const TableView = (props) => {
  const { headers, filterCriteria, tableData, trKey, tableType } = props;
  //Pass filter name key as prop
  return (
    <div>
      <TableFilter tableData={tableData} filterCriteria={filterCriteria} headers={headers} trKey={trKey} tableType={tableType} />
    </div>
  )
}

const TableButton = () => {
  const filterCriteria =
  {
    name: "",
    status: "",
    developerName: "",
    application: ""
  }
  const tableData = [
    { id: 4, name: 'fourth ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 1, name: 'first ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 2, name: 'second ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 3, name: 'third ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "open" },
    { id: 5, name: 'first ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "open" }
  ]

  const filterKeys = Object.keys(filterCriteria)


  // eslint-disable-next-line no-unused-vars
  const buildDropdownMenu = (filterName) => {
    const uniqueFilterKeyValues = [...new Set(tableData.map(value => value[filterName]))]
    console.log("Unique Filter Key Values " + uniqueFilterKeyValues)
    return (
      uniqueFilterKeyValues.map((value, index) => {
        < Dropdown.Item eventKey={index} >
          {value}
        </Dropdown.Item >
      })
    )
  }

  return (
    <div>
      <h1>Filter Button</h1>
      <Dropdown>
        <Dropdown.Toggle>
          test
          </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            test
            </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {
        filterKeys.map((value, index) => {
          { console.log("Value : " + value + " Index : " + index) }
          <Dropdown>
            <Dropdown.Toggle variant="success" id={index}>
              {value} filter
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="1">
                test
              </Dropdown.Item>
              {/*buildDropdownMenu(value)*/}
            </Dropdown.Menu>
          </Dropdown>
        })
      }
    </div>
  )
}

//Need to pass in Filter Objects
//Props passed in from Parent of Table Type and then TableType
const TableFilter = (props) => {
  const { tableData, filterCriteria, headers, trKey, tableType } = props;
  const [updatedTableData, setupdatedTableData] = useState(tableData);
  const [filterStatus, setfilterStatus] = useState(true);

  const handleClick = (filteredData) => {
    //Changes filter status (true/false) on each click
    setfilterStatus(!filterStatus)
    //If filter is true (clicked) then filter data or display all data
    return filterStatus ? tableData.filter(row => row[filterCriteria] === filteredData) : tableData
  }

  return (
    <div>
      {
        // If status true display filter or display clear button
        filterStatus ?
          < DropdownButton variant="secondary" title="Filter" size="md">
            {tableData.map((row, key) => {

              return (
                <Dropdown.Item onClick={() => setupdatedTableData(handleClick(row[filterCriteria]))} key={key} href="">
                  {row[filterCriteria]}
                </Dropdown.Item>
              )
            })}
          </ DropdownButton >
          :
          <Button variant="secondary" size="md" onClick={() => setupdatedTableData(handleClick())}>Clear Filter</Button>
      }
      <TableButton />
      <TableHeader headers={headers} rows={updatedTableData} trKey={trKey} tableType={tableType} />
    </div>
  )
}

const TableHeader = (props) => {

  const { headers, rows, trKey, tableType } = props;
  const [headerSort, setheaderSort] = useState();
  const [sortStatus, setsortStatus] = useState(false);

  //sends the table header column name clicked to be sorted
  //changes the table header column to be sorted by ascending or descending
  const handleClick = (headerClicked) => {
    setheaderSort(headerClicked)
    setsortStatus(!sortStatus)
  }

  return (
    <div>
      {/*onClick sends the name of the table header column to handleClick */}

      < Table striped bordered hover responsive="md" >
        <thead className="thead-dark" key="header-1">
          <tr key="header-0">
            {headers && headers.map((value, index) => {
              return <th key={index} onClick={() => handleClick(value)}><div>{value}</div></th>
            })}
          </tr>
        </thead>
        <TableBody rows={rows} headers={headers} sortField={headerSort} sortBy={sortStatus} trKey={trKey} tableType={tableType}></TableBody>
      </Table >
    </div>
  )
}

const TableBody = (props) => {
  const { headers, rows, sortField, sortBy, trKey, tableType } = props;

  //on click of tr (tablerow) display the form for the row clicked
  const history = useHistory()
  const handleClick = (rowID) => history.push(`${tableType}/update/${rowID}`)

  //If true sort by ascending or if false sort by descending, column header to sort is passed by parent component
  sortBy ? rows.sort((a, b) => a[sortField] > b[sortField] ? 1 : -1) : rows.sort((a, b) => a[sortField] > b[sortField] ? -1 : 1)

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
