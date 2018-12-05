import { combineReducers } from 'redux'
import AccountsReducer from './accounts'
import AssetsReducer from './assets'
import AuthReducer from './auth'
import ChartReducer from './chart'
import ContstantsReducer from './constants'
import DocumentsReducer from './documents'
import OrderReducer from './order'
import PostCodesReducer from './postcodes'
import QuoteReducer from './quote'
import VerificationReducer from './verification'
import { reducer as FormReducer } from 'redux-form'

const rootReducer = combineReducers({
	accounts: AccountsReducer,
	assets: AssetsReducer,
	auth: AuthReducer,
	chart: ChartReducer,
	constants: ContstantsReducer,
	documents: DocumentsReducer,
	order: OrderReducer,
	postcodes: PostCodesReducer,
	quote: QuoteReducer,
	verification: VerificationReducer,
	form: FormReducer
})

export default rootReducer
