import { combineReducers } from 'redux'
import AssetsReducer from './assets'
import AuthReducer from './auth'
import ChartReducer from './chart'
import QuoteReducer from './quote'

const rootReducer = combineReducers({
	assets: AssetsReducer,
	auth: AuthReducer,
	chart: ChartReducer,
	quote: QuoteReducer
})

export default rootReducer
