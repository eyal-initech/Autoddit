import React from 'react'
import { connect } from 'react-redux'
import {
  Feed,
  Image,
} from 'semantic-ui-react'
import * as actions from '../actions'
import * as api from '../api'
import Post from './post'
import Votes from './votes'



class FeedMain extends React.Component {
  constructor(props) {
    super(props);
    this.voteHandler = this.voteHandler.bind(this);
    this.props.dispatch(api.getPosts());
  }

  voteHandler(id, vote, upvotes) {
    // If the user hasn't voted on the post OR hasn't up/down voted once.
    vote = (vote === 'up') ? actions.UPVOTE_POST : actions.DOWNVOTE_POST;
    this.props.dispatch(api.voteOnPost(id, vote, upvotes));
  }

  render() {
    const posts = Object.keys(this.props.posts).map((key) => ({post: this.props.posts[key], id: key}));
    return (
      <Feed>
      {
        posts.map(({post, id}) => (
          <Feed.Event key={id}>
            <Votes id={id} upvotes={post.upVotes} voteHandler={this.voteHandler} />
            <Image src={post.imageUrl} size='tiny' style={{'maxHeight': '70px'}} spaced />
            <Post post={post} id={id}/>
          </Feed.Event>
        ))
      }
      </Feed>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({posts: state.posts, user:state.user, ownProps});
export default connect(mapStateToProps)(FeedMain);
