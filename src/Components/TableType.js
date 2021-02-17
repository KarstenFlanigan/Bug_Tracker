/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table'
import Dropdown from 'react-bootstrap/Dropdown'
import ListGroup from 'react-bootstrap/ListGroup'

//import DropdownButton from 'react-bootstrap/DropdownButton'
import Button from 'react-bootstrap/Button'

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect, useHistory, withRouter, BrowserRouter } from 'react-router-dom'

function TableType() {

  //CREATE MULTI-FILTER OPTION, one for open/closed and then X

  //Passed in prop from parent of tabletype defining what view(s) to use Ex:(developer)
  const tableType = "ticket"

  //Use if then statement based on tabletype prop to determine what API to call to create table
  const tableData = [
    { id: 1, name: 'first ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 2, name: 'second ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "closed" },
    { id: 3, name: 'third ticket', dueDate: '2020-12-29', developerName: "chris", severity: "high", application: "bug tracker", status: "open" }
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
  //const filterCriteria = { name: "" }

  const filterCriteria =
  {
    name: "",
    status: "",
    developerName: "",
    application: ""
  }

  //Unique key for the HTML TR Key (Usually the primary key of the database table)
  //CHANGE NAME TO PRIMARY KEY?? USE THE PRIMARY KEY ID TO LINK TO FORM FOR CRUD?
  const trKey = "id"

  return (
    <TableView headers={Object.keys(tableHeaders)} filterCriteria={filterCriteria} tableData={tableData} trKey={trKey} tableType={tableType} />
  )
}

//Headers passed in from parent TableType
//Table Data for rows passed into TableBody by Filter component, since filter will modify the rows displayed
const TableView = (props) => {
  const { headers, filterCriteria, tableData, trKey, tableType } = props;
  //Pass filter name key as prop
  return (
    <TableToolBar tableData={tableData} filterCriteria={filterCriteria} headers={headers} trKey={trKey} tableType={tableType} />
  )
}

const TableToolBar = (props) => {
  const { tableData = { tableData }, filterCriteria = { filterCriteria }, headers = { headers }, trKey = { trKey }, tableType = { tableType } } = props
  return (
    <FilterButton tableData={tableData} filterCriteria={filterCriteria} headers={headers} trKey={trKey} tableType={tableType} />
  )
}

const FilterButton = (props) => {
  const { tableData = { tableData }, filterCriteria = { filterCriteria }, headers = { headers }, trKey = { trKey }, tableType = { tableType } } = props
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
      <TableHeader tableData={updatedTableData} filterCriteria={filterCriteria} headers={headers} trKey={trKey} tableType={tableType} />
    </div>
  )
}

/*
const FilterButton = (props) => {
  const { filterCriteria, tableData } = props
  const [filterStatus, setfilterStatus] = useState(false);
  //SEND FILTERBY TO NEXT COMPONENT WHICH WILL ACTUALLY DO THE SORT
  const [filterBy, setfilterBy] = useState();
 
  const handleClick = (selectedDropdownItem) => {
    setfilterStatus(!filterStatus)
    setfilterBy(selectedDropdownItem)
    console.log("filterBY: " + filterBy + " selectedDropdownItem: " + selectedDropdownItem)
 
    TableBody(filterBy)
  }
 
  const buildDropdownMenu = (filterName) => {
    //Get unique filter values from passed in filter name that was chosen from table's data
    //console.log("Build dropdown " + filterName)
    const uniqueFilterKeyValues = [...new Set(tableData.map(value => value[filterName]))]
    //console.log("Unique Filter Key Values " + uniqueFilterKeyValues)
    return (
      uniqueFilterKeyValues.map((value, index) => {
        return (
          <Dropdown.Item key={index} onClick={() => handleClick(value)} >
            {value}
          </Dropdown.Item >
        )
      })
    )
  }
  //Use filterCriteria props passed in to create button
  //Switches between filter and clear filter based on state that changes on handleclick
  return (
    <div>
      {
        filterStatus ?
          <Dropdown>
            <Dropdown.Toggle variant="success">
              {filterCriteria} filter
            </Dropdown.Toggle>
 
            <Dropdown.Menu>
              {buildDropdownMenu(filterCriteria)}
            </Dropdown.Menu>
          </Dropdown >
 
          :
 
          <Button variant="success" size="md" onClick={() => handleClick()}>clear {filterCriteria} filter</Button>
      }
    </div>
  )
}
*/

/*
//DEPRECATING
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
      <TableButton tableData={tableData} filterCriteria={filterCriteria} tableType={tableType} />
      <TableHeader headers={headers} rows={updatedTableData} trKey={trKey} tableType={tableType} />
    </div>
  )
}
*/

const TableHeader = (props) => {

  const { headers, tableData, trKey, tableType } = props;
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
      <TableBody rows={tableData} headers={headers} sortField={headerSort} sortBy={sortStatus} trKey={trKey} tableType={tableType}></TableBody>
    </Table>
  )
}

const TableBody = (props) => {
  const { headers, rows, sortField, sortBy, trKey, tableType } = props;
  //on click of tr (tablerow) display the form for the row clicked
  const history = useHistory()
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
