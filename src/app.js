// React imports
import React from 'react'
import semanticStyle from 'semantic-ui-css/semantic.min.css'
import faStyle from 'font-awesome/css/font-awesome.min.css'
import { Container } from 'semantic-ui-react'
import { Routes } from './components/routes'
import NavBar from './components/navbar'


export default () => {
  return (
    <React.Fragment>
      <NavBar />
      <Container style={{'marginTop': '50px'}}>
        <Routes />
      </Container>
    </React.Fragment>
  );
};
