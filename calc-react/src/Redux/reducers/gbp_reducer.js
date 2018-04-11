import {
    FETCH_GBP,
    FETCH_GBP_START,
    FETCH_GBP_END
  } from '../actions';
  
  import _ from 'lodash'

  const INITIAL_STATE = {
    loading: true,
    error: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_GBP:
          state = _.assign(...state, action.payload.data);
          return { ...state, loading: false, error: null }
        case FETCH_GBP_START:
          return { ...state, loading: true, error: null }
        case FETCH_GBP_END:
          return { ...state, loading: false, error: action.payload }
        default:
          return state;
    }
  };
  