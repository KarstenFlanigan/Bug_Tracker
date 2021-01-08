import React from 'react'
//If I remove line then I can't route, make sure to NOT COPY PASTE, need to manually add exception
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'
import TableType from './TableType'
//import Routes from './Routes'
//import Form from './Routes'


function Home() {
    return (
        <TableType />
    )
}

export default Home