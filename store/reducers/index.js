import { combineReducers } from 'redux'
import AssetsReducer from './assets'
import ChartReducer from './chart'
import QuoteReducer from './quote'

const rootReducer = combineReducers({
	assets: AssetsReducer,
	chart: ChartReducer,
	quote: QuoteReducer
})

export default rootReducer
