import { combineReducers } from 'redux'
import QuoteReducer from './quote'

const rootReducer = combineReducers({
	quote: QuoteReducer
})

export default rootReducer
