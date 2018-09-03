import {
  FETCH_RATES,
  FETCH_RATES_START,
  FETCH_RATES_END
} from '../actions'

import _ from 'lodash'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_RATES:
      // state = _.assign(...state, action.payload.data)
      return { ...state, data: action.payload.data, loading: false, error: null }

    case FETCH_RATES_START:
      return { ...state, loading: true, error: null }

    case FETCH_RATES_END:
      return { ...state, loading: false, error: action.payload }
      
    default:
      return state
  }
}
