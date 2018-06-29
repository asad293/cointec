import {
  FETCH_QUOTE,
  FETCH_QUOTE_START,
  FETCH_QUOTE_END
} from '../actions'

import _ from 'lodash'

const INITIAL_STATE = {
  loading: false,
  error: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_QUOTE:
      state = _.assign(...state, action.payload.data)
      return { ...state, loading: false, error: null }

    case FETCH_QUOTE_START:
      return { ...state, loading: true, error: null }

    case FETCH_QUOTE_END:
      return { ...state, loading: false, error: action.payload }
      
    default:
      return state
  }
}
