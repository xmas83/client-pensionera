import {Octokit} from "@octokit/rest";
import {
  GET_POSTS,
  SET_USER
} from './types';

import {token} from '../config';

const octokit = new Octokit({
  auth: token,
  userAgent: 'xmas83'
});


// getting list of users
export const getUsers = () => async dispatch => {
  try {
    await octokit.request('GET /users', {})
      .then(res => {
        dispatch({
          type: GET_POSTS,
          payload: res.data
        });
      })
      .catch(err => console.log(err));
  } catch (err) {
    console.log(err)
  }
};

// Setting selected user
export const setUser = (user) => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: user
  });
};
