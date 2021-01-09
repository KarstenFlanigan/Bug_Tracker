/* eslint-disable react/prop-types */
//MODULE IMPORT
import React from 'react'
import './App.css'
import Container from 'react-bootstrap/Container'
//Must have for react-router to work, don't copy/paste, need to manually add and then make eslint exception
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

//COMPONENT IMPORT
import Navigation from './Components/Navigation'

function App() {

  return (
    <Container>
      <Navigation />
    </Container>
  )
}

export default App
