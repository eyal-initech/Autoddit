import { combineReducers } from 'redux'
import {
  UPDATE_LOGIN,
  UPDATE_VOTED_POSTS,
  ADD_POST,
  ADD_POSTS,
  REMOVE_POST,
  UPVOTE_POST,
  DOWNVOTE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
} from './actions'

const USER_INITIAL = {name: '', loggedIn: false};
const USERS_VOTED_POSTS = {}
const POSTS_INITIAL = {};
const COMMENTS_INITIAL = {};

const userReducer = (state=USER_INITIAL, {type, payload}) => {
  switch (type) {
    case UPDATE_LOGIN:
      return {...state, ...payload};
    default:
      return state;
  }
}


const postReducer = (state=POSTS_INITIAL, {type, payload, id}) => {
  switch (type) {
    case ADD_POSTS:
      return { ...state, ...payload, };
    case ADD_POST:
      return { ...state, ...payload };
    case REMOVE_POST:
      return { ...state, payload };
    case UPVOTE_POST:
      return {...state, [id]: {...state[id], 'upVotes': payload}}
    case DOWNVOTE_POST:
      return {...state, [id]: {...state[id], 'upVotes': payload}}
    default:
      return state;
  }
};

const commentReducer = (state=COMMENTS_INITIAL, {type, payload, id}) => {
  switch (type) {
    case ADD_COMMENT:
      return {...state, ...payload};
    case UPVOTE_COMMENT:
      return {...state, [id]: {...state[id], 'upVotes': payload}};
    case DOWNVOTE_COMMENT:
      return {...state, [id]: {...state[id], 'upVotes': payload}};
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
  comments: commentReducer
});

export default rootReducer;
