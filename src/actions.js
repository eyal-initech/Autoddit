// LOGIN ACTIONS
export const UPDATE_LOGIN = 'UPDATE_LOGIN';
export const UPDATE_VOTED_POSTS = 'UPDATE_VOTED_POSTS';
// POSTS ACTIONS
export const ADD_POST = 'ADD_POST';
export const ADD_POSTS = 'ADD_POSTS';
export const REMOVE_POST = 'REMOVE_POST';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';

// COMMENTS ACTIONS
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';


export const updateUser = (name) => ({type: UPDATE_LOGIN, payload: {name, loggedIn: true}});

export const addPost = (post) => ({type: ADD_POST, payload: post});
export const addPosts = (data) => ({type: ADD_POSTS, payload: data});
export const upVotePost = (id, upvotes) => ({type: UPVOTE_POST, payload: upvotes + 1, id});
export const downVotePost = (id, upvotes) => ({type: UPVOTE_POST, payload: upvotes - 1, id});

export const addComment = (comment) => ({type: ADD_COMMENT, payload: comment});
export const upVoteComment = (id, upvotes) => ({type: UPVOTE_COMMENT, payload: upvotes + 1, id});
export const downVoteComment = (id, upvotes) => ({type: DOWNVOTE_COMMENT, payload: upvotes - 1, id});

export const updateVotedPosts = (id, dir) => ({type: UPDATE_VOTED_POSTS, payload: {[id]: {[dir]: true}}});
