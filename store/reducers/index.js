import { combineReducers } from 'redux'
import AccountsReducer from './accounts'
import AssetsReducer from './assets'
import AuthReducer from './auth'
import ChartReducer from './chart'
import ContstantsReducer from './constants'
import OrderReducer from './order'
import QuoteReducer from './quote'
import { reducer as FormReducer } from 'redux-form'

const rootReducer = combineReducers({
	accounts: AccountsReducer,
	assets: AssetsReducer,
	auth: AuthReducer,
	chart: ChartReducer,
	constants: ContstantsReducer,
	order: OrderReducer,
	quote: QuoteReducer,
	form: FormReducer
})

export default rootReducer
