# Autoddit Task

I highly recommened using `python` for serving files and not installing another `NODE` library if you have python already installed:
1. `git clone `
2. `cd autodesktest/dist`
3. python2.7: `python -m SimpleHTTPServer`, python3.6: `python -m http.server`


This is the Autoddit assignment.
It conatins the main points of the task which are:
1. Login.
2. Post page.
3. Adding posts.
4. Commenting.
5. Tree commenting.

To run webpack-dev-server `yarn start`
To build `yarn build`

The project uses these libraries:
1. React.
2. Redux (with react-redux).
3. React-Router.
4. Semantic-UI (UI framework)
And built with webpack.

## Structure
The project is built with a client/server setup in mind, the server is loaded with 2 JSON files.
1. Posts file, represents the data that would come from a restful endpoint, normalized to a map (JS object) for quick lookups.
2. Comments, a flat map of comments with a 2 way relationship between parent child (post-comment, comment-comment)

The api calls are promises that resolve. This makes it easier to remove the fake API call and replace with a real one with
relative ease.

All actions have action creators that call an API.
All calls are `thunked` to get the a good async expirence (async await would be better, but this was faster to setup)

## Components structure
Most of the components are statefull, the stateless components were provided by SemanticUI.


## Design choices
Most of the design choices are straight forward.
The only concern is the `Comments` section, where I decided to go with a DFS approach to recursivley build the comments "tree"
in a nested way and let `React` handle the rest.

Another design choice was to setup the `Posts` and `Comment` as maps, for quick ID lookups.
