import React from 'react'
import {
  Form,
  Input,
  Button,
  Message
} from 'semantic-ui-react'
// Redux imports
import { connect } from 'react-redux'
import * as routes from './routes'
import * as actions from '../actions'
import * as api from '../api'


class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.errorBase = {titleError: false, linkError: false, imageUrlError: false}
    this.state = {title: '', link: '', imageUrl: ''};
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit() {
    if (this.state.title.length > 0 && this.state.imageUrl.length > 0) {
      this.props.dispatch(
        api.setPost({
          title: this.state.title,
          link: this.state.link,
          imageUrl: this.state.imageUrl,
          createdAt: new Date().getTime(),
          user: this.props.username,
          upVotes: 0,
          comments: []
        })
      ).then(() => this.props.history.push(routes.HOME));
    } else {
      let errors = {...this.errorBase};
      if (this.state.title.length === 0) {
        errors = {...errors, titleError: true}
      }
      if (this.state.link.length === 0) {

      }
      if (this.state.imageUrl.length === 0) {
        errors = {...errors, imageUrlError: true};
      }
      this.setState({...errors});
    }
  }

  onChange(event, input) {
    this.setState({[input]: event.target.value});
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={this.state.error}>
        <Form.Field>
          <label>Title</label>
          <Input onChange={(e) => this.onChange(e, 'title')} value={this.state.title}/>
          <Message error header='Title cannot be empty' content='Please fill the title field' visible={this.state.titleError}/>
        </Form.Field>
        <Form.Field>
          <label>Link</label>
          <Input onChange={(e) => this.onChange(e, 'link')} value={this.state.link}/>
          <Message error header='Link cannot be empty' content='Please fill the Link field' visible={this.state.imageUrlError}/>
        </Form.Field>
        <Form.Field>
          <label>Image Link</label>
          <Input onChange={(e) => this.onChange(e, 'imageUrl')} value={this.state.imageUrl}/>
          <Message error header='Image URL cannot be empty' content='Please fill the image URL field' visible={this.state.imageUrlError}/>
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({username: state.user.name, ...ownProps});
export default connect(mapStateToProps)(PostForm);
