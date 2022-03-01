import {
  GET_POSTS,
  SET_USER
} from '../actions/types';

const initialState = {
  posts: [],
  user: null,
  loading: true,
  error: {}
};

function postReducer(state = initialState, action) {
  const {type, payload} = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        user: payload[0],
        loading: false
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
        loading: false
      };
    default:
      return state;
  }
}

export default postReducer;
