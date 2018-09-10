import {
  SIGN_UP,
  SIGN_UP_START,
  SIGN_UP_END
} from '../actions'

const INITIAL_STATE = {
  loading: false,
  error: null,
  signup: null,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, signup: action.payload.data, loading: false, error: null }
    
    case SIGN_UP_START:
      return { ...state, loading: true, error: null }

    case SIGN_UP_END:
      return { ...state, loading: false, error: action.payload }

    default:
     return state
  }
}