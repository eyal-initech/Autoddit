import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import FeedMain from './feed'
import LoginForm from './login'
import PostForm from './post-form'

export const HOME = '/';
export const ADD_POST = '/add-post';
export const LOGIN = '/login';


const LoginRequiredComponent = (props) => (
  (props.loggedIn) ? <Route {...props}/> : <Redirect to={LOGIN}/>
);
const stateToProps = ({user}) => ({loggedIn: user.loggedIn});
const LoginRequired = connect(stateToProps)(LoginRequiredComponent);

export const Routes = ({loggedIn}) => (
  <Switch>
    <Route exact path={LOGIN} component={LoginForm} />
    <LoginRequired loggedIn={loggedIn} exact path={HOME} component={FeedMain} />
    <LoginRequired loggedIn={loggedIn} exact path={ADD_POST} component={PostForm} />
  </Switch>
);


