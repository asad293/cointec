import { combineReducers } from 'redux'
import GBPReducer from './gbp_reducer'
import BTCReducer from './btc_reducer'
import ChartReducer from './chart_reducer'
import LimitReducer from './limit_reducer'
import BankReducer from './bank_reducer'
import OrderReducer from './order_reducer'
import QuoteReducer from './quote_reducer'
import { reducer as FormReducer} from 'redux-form'

const rootReducer = combineReducers({
    gbpRate: GBPReducer,
    btcRate: BTCReducer,
    chart: ChartReducer,
    quote: QuoteReducer,
    limit: LimitReducer,
    bank: BankReducer,
    form: FormReducer,
    order: OrderReducer,
})

export default rootReducer