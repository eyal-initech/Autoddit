import React from 'react'
import { connect } from 'react-redux'
import {
  Button,
  Comment,
  Feed,
  Icon,
} from 'semantic-ui-react'

import * as api from '../api'
import CommentModal from './comment-modal'
import Comments from './comment'
const strftime = require('strftime');

const ShowComments = ({showComments, comments, postId}) => {
  return (showComments) ? (
    <Comment.Group>
    {
      Object.entries(comments).map(
        ([id, comment]) => <Comments key={id} id={id} postId={postId} comment={comment}/>
      )
    }
    </Comment.Group>
  ) : '';
};

const getNestedComments = (id, comments, commentsNestedObject) => {
  // iterate over the comments again and correctly nest the children
  let comment = comments[id];

  commentsNestedObject[id] = {...comment};
  commentsNestedObject[id].children = {};
  comment.comments.forEach((commentId) => {
    getNestedComments(commentId, comments, commentsNestedObject[id].children);
  });

  return commentsNestedObject;
}

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalOpen: false, showComments: false, modalFormValue: ''};
    this.triggerModal = this.triggerModal.bind(this);
    this.onModalChange = this.onModalChange.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);

    this.props.dispatch(api.getCommentsByPost(this.props.id));
  }

  onModalSubmit() {
    let data = {
      user: this.props.username,
      comment: this.state.modalFormValue,
      createdAt: new Date().getTime(),
      upVotes: 0,
      postId: parseInt(this.props.id),
      parentId: null,
      comments: []
    };

    this.props.dispatch(api.setCommentPost(this.props.id, data))
      .then(() => this.props.dispatch(api.getPosts()))
      .then(() => this.setState({modalOpen: !this.state.modalOpen, modalFormValue: ''}));
  }

  onModalChange(event) {
    this.setState({modalFormValue: event.target.value});
  }

  triggerModal() {
    this.setState({modalOpen: !this.state.modalOpen});
  }

  getCommentsFromProps(nextPropsComments) {
    let comments = {}
    for (let id in nextPropsComments) {
      if (nextPropsComments[id]['postId'] === parseInt(this.props.id)) {
        comments[id] = nextPropsComments[id]
      }
    }
    return comments;
  }

  componentWillReceiveProps(nextProps) {
    let comments = this.getCommentsFromProps(nextProps.comments);
    let commentsNestedObject = {};

    Object.entries(comments)
      .filter(([key, value]) => value.parentId === null)
      .forEach(([key, value]) => getNestedComments(key, comments, commentsNestedObject));

    this.setState({commentsCount: Object.keys(comments).length, nestedComments: commentsNestedObject});
  }

  render() {
    return (
      <Feed.Content>
        <Feed.Summary>
          <Feed.User href={this.props.post.link}>{this.props.post.title}</Feed.User>
        </Feed.Summary>
        <Feed.Meta>
          <Feed.Date>
            Submitted on {strftime('%b %e, %Y %R', new Date(this.props.post.createdAt))} by <Feed.User>{this.props.post.user}</Feed.User>
          </Feed.Date>
          <Feed.Like onClick={() => this.setState({showComments: !this.state.showComments})}>
            <Icon name='comment'/>
            <span>{this.state.commentsCount} comments</span>
          </Feed.Like>
          <Button comapct='true' size='mini' onClick={this.triggerModal}>Add comment</Button>
          <CommentModal modalOpen={this.state.modalOpen} triggerModal={this.triggerModal} onModalSubmit={this.onModalSubmit} onModalChange={this.onModalChange} modalFormValue={this.state.modalFormValue}/>
        </Feed.Meta>
        <ShowComments showComments={this.state.showComments} comments={this.state.nestedComments} postId={this.props.id}/>
      </Feed.Content>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({username: state.user.name, comments: state.comments, ...ownProps});
export default connect(mapStateToProps)(Post);
