import {
    FETCH_LIMIT,
    FETCH_LIMIT_START,
    FETCH_LIMIT_END,
    FETCH_CONSTANT,
    FETCH_ASSETS
  } from '../actions';

import _ from 'lodash'
  
  const INITIAL_STATE = {
    loading: true,
    error: null,
    const: null,
    assets: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ASSETS:
            return { ...state, assets: action.payload.data }
        case FETCH_CONSTANT:
            return { ...state, const: action.payload.data }
        case FETCH_LIMIT:
            state = _.assign(...state, action.payload.data);
            return { ...state, loading: false, error: null }
        case FETCH_LIMIT_START:
            return { ...state, loading: true, error: null }
        case FETCH_LIMIT_END:
            return { ...state, loading: false, error: action.payload }
        default:
            return state;
    }
  };
  