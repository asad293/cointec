import {
    FETCH_ACCOUNTS,
    FETCH_ACCOUNTS_START,
    FETCH_ACCOUNTS_END,
    ADD_ACCOUNT,
    ADD_ACCOUNT_START,
    ADD_ACCOUNT_END
  } from '../actions';

  const INITIAL_STATE = {
    loading: false,
    error: null,
    accounts: null,
    addFN: null,
    fetched: false,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ACCOUNTS:
          return { ...state, addFN: null,fetched: true, accounts: action.payload.data, loading: false, error: null }
        case FETCH_ACCOUNTS_START:
          return { ...state,fetched: false, loading: true, error: null }
        case ADD_ACCOUNT_START:
          return { ...state, loading: true, error: null }
        case FETCH_ACCOUNTS_END:
        case ADD_ACCOUNT_END:
          return { ...state, loading: false, error: action.payload }

        case ADD_ACCOUNT:
          return { ...state, addFN: action.payload.data, loading: false, error: null }
        
        default:
          return state;
    }
  };
  