import {
  SIGN_UP,
  SIGN_UP_START,
  SIGN_UP_END,
  SIGN_IN,
  SIGN_IN_START,
  SIGN_IN_END,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_END,
  RESET_PASSWORD,
  RESET_PASSWORD_START,
  RESET_PASSWORD_END,
} from '../actions'

const INITIAL_STATE = {
  loading: false,
  error: null,
  signup: null,
  signin: null,
  forgotpassword: null,
  resetpassword: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, signup: action.payload.data, loading: false, error: null }
    
    case SIGN_IN:
      return { ...state, signin: action.payload.data, loading: false, error: null }
    
    case FORGOT_PASSWORD:
      return { ...state, forgotpassword: action.payload.data, loading: false, error: null }
    
    case RESET_PASSWORD:
      return { ...state, resetpassword: action.payload.data, loading: false, error: null }
    
    case SIGN_IN_START:
    case SIGN_UP_START:
    case FORGOT_PASSWORD_START:
    case RESET_PASSWORD_START:
      return { ...state, loading: true, error: null }

    case SIGN_UP_END:
    case SIGN_IN_END:
    case FORGOT_PASSWORD_END:
    case RESET_PASSWORD_END:
      return { ...state, loading: false, error: action.payload }

    default:
     return state
  }
}