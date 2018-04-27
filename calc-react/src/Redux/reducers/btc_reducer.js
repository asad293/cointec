import {
    FETCH_BTC,
    FETCH_BTC_START,
    FETCH_BTC_END
  } from '../actions';
  
  import _ from 'lodash'

  const INITIAL_STATE = {
    loading: true,
    error: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_BTC:
          state = _.assign(...state, action.payload.data);
          return { ...state, loading: false, error: null }
        case FETCH_BTC_START:
          return { ...state, loading: true, error: null }
        case FETCH_BTC_END:
          return { ...state, loading: false, error: action.payload }
        default:
          return state;
    }
  };
  