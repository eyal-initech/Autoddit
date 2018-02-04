import React from 'react'
import {
  Form,
  Input,
  Button,
  Message
} from 'semantic-ui-react'
// Redux imports
import { connect } from 'react-redux'
import { HOME } from './routes'
import * as actions from '../actions'
import * as api from '../api'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {name: '', error: false};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    if (this.state.name) {
      api.setUsername(this.state.name)
        .then((username) => this.props.dispatch(api.login(username)))
        .then(() => this.props.history.push(HOME));
    } else {
      this.setState({error: true});
    }
  }

  onChange(event) {
    this.setState({name: event.target.value});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={this.state.error}>
        <Form.Field>
          <label>User Name</label>
          <Input placeholder='First Name' onChange={this.onChange} value={this.state.name}/>
          <Message error header='User name cannot be empty' content='Please fill in the user name'/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

export default connect()(LoginForm);
