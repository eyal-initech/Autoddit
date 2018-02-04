import React from 'react'
import { connect } from 'react-redux'
import {
  Comment,
} from 'semantic-ui-react'
import * as api from '../api'
import * as actions from '../actions'
import CommentModal from './comment-modal'
import Votes from './votes'
const strftime = require('strftime');

class AutodditCommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {modalOpen: false, modalFormValue: ''};
    this.triggerModal = this.triggerModal.bind(this);
    this.onModalChange = this.onModalChange.bind(this);
    this.onModalSubmit = this.onModalSubmit.bind(this);
    this.voteHandler = this.voteHandler.bind(this);
  }

  onModalSubmit() {
    let data = {
      user: this.props.username,
      comment: this.state.modalFormValue,
      createdAt: new Date().getTime(),
      upVotes: 0,
      postId: parseInt(this.props.postId),
      parentId: this.props.id || null,
      comments: []
    };

    this.props.dispatch(api.setCommentReply(this.props.id, data))
      .then(() => this.setState({modalOpen: !this.state.modalOpen, modalFormValue: ''}));
  }

  voteHandler(id, vote, upvotes) {
    // If the user hasn't voted on the post OR hasn't up/down voted once.
    vote = (vote === 'up') ? actions.UPVOTE_COMMENT : actions.DOWNVOTE_COMMENT;
    this.props.dispatch(api.voteOnComment(id, vote, upvotes));
  }

  onModalChange(event) {
    this.setState({modalFormValue: event.target.value});
  }

  triggerModal() {
    this.setState({modalOpen: !this.state.modalOpen});
  }

  render () {
    return (
      <Comment>
        <div className='avatar'>
          <Votes id={this.props.id} upvotes={this.props.comment.upVotes} voteHandler={this.voteHandler} withStyling/>
        </div>
        <Comment.Content>
          <Comment.Author as='a'>{this.props.comment.user}</Comment.Author>
          <Comment.Metadata>
            <div>{strftime('%b %e, %Y %R', new Date(this.props.comment.createdAt))}</div>
          </Comment.Metadata>
          <Comment.Text>{this.props.comment.comment}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={this.triggerModal}>Reply</Comment.Action>
            <CommentModal modalOpen={this.state.modalOpen} triggerModal={this.triggerModal} onModalSubmit={this.onModalSubmit} onModalChange={this.onModalChange} modalFormValue={this.state.modalFormValue}/>
          </Comment.Actions>
        </Comment.Content>
        <Comment.Group>
          {
            (this.props.comment.children) ? (
              <Comment.Group>
              {
                Object.entries(this.props.comment.children).map(
                  ([id, comment]) => <AutodditComment key={id} id={id} comment={comment} postId={this.props.postId}/>
                )
              }
              </Comment.Group>
            ) : ''
          }
        </Comment.Group>
      </Comment>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({username: state.user.name, ...ownProps});
const AutodditComment = connect(mapStateToProps)(AutodditCommentComponent);
export default AutodditComment;
