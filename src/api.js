let posts = require('./data/posts.json') // We have to use require to use the default webpack loader, not the babel loader.
let comments = require('./data/comments.json') // We have to use require to use the default webpack loader, not the babel loader.
import {
  UPVOTE_POST,
  DOWNVOTE_POST,
  UPVOTE_COMMENT,
  DOWNVOTE_COMMENT,
  addPosts,
  addPost,
  addComment,
  upVotePost,
  downVotePost,
  upVoteComment,
  downVoteComment,
  updateUser,
  updateVotedPosts
} from './actions'

export const getJSONPosts = () => new Promise((resolve) => resolve(posts));
export const getJSONComments = () => new Promise((resolve) => resolve(comments));
export const setUsername = (username) => new Promise((resolve) => resolve(username));
export const getCommentsByPostAPI = (postId) => {
  let retrComment = {};
  for (let id in comments) {
    if (comments[id]['postId'] === parseInt(postId)) {
      retrComment[id] = comments[id]
    }
  }
  return new Promise((resolve) => resolve(retrComment));
};
export const getCommentsAPI = (commentIds) => {
  let retrComment = {};
  commentIds.forEach((id) => retrComment[id] = comments[id]);
  return new Promise((resolve) => resolve(retrComment));
};

export const putPost = (post) => {
  let nextId = Math.max(...Object.keys(posts)) + 1;
  posts = {...posts, [nextId]: post};
  return new Promise((resolve) => resolve({[nextId]: post}));
};

export const putComment = (postId, comment) => {
  let nextId = Math.max(...Object.keys(comments)) + 1;
  comments = {...comments, [nextId]: comment};
  posts[postId].comments.push(nextId);
  return new Promise((resolve) => resolve({[nextId]: comment}));
};

export const putReply = (commentId, comment) => {
  let nextId = Math.max(...Object.keys(comments)) + 1;
  comments = {...comments, [nextId]: comment};
  comments[commentId].comments.push(nextId);
  return new Promise((resolve) => resolve({[nextId]: comment}));
};

export const login = (username) => (dispatch) => {
  return setUsername(username).then((data) => dispatch(updateUser(data)))
};

export const getPosts = () => {
  return (dispatch) => getJSONPosts().then((data) => dispatch(addPosts(data)))
};

export const getComments = (commentIds) => {
  return (dispatch) => getCommentsAPI(commentIds).then((data) => dispatch(addComment(data)))
};

export const getCommentsByPost = (postId) => {
  return (dispatch) => getCommentsByPostAPI(postId).then((data) => dispatch(addComment(data)))
};

export const setPost = (post) => {
  return (dispatch) => putPost(post).then((data) => dispatch(addPost(data)))
};

export const setCommentPost = (postId, comment) => {
  return (dispatch) => putComment(postId, comment).then((data) => dispatch(addComment(data)))
};

export const setCommentReply = (commentId, comment) => {
  return (dispatch) => putReply(commentId, comment).then((data) => dispatch(addComment(data)))
}

export const voteOnPost = (id, type, upvotes) => (dispatch) => {
  dispatch((type === UPVOTE_POST) ? upVotePost(id, upvotes) : downVotePost(id, upvotes));
};

export const voteOnComment = (id, type, upvotes) => (dispatch) => {
  dispatch((type === UPVOTE_COMMENT) ? upVoteComment(id, upvotes) : downVoteComment(id, upvotes));
}
