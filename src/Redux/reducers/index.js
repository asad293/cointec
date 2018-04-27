import { combineReducers } from 'redux'
import GBPReducer from './gbp_reducer'
import BTCReducer from './btc_reducer'
import LimitReducer from './limit_reducer'
import BankReducer from './bank_reducer'
import { reducer as FormReducer} from 'redux-form'

const rootReducer = combineReducers({
    gbpRate: GBPReducer,
    btcRate: BTCReducer,
    limit: LimitReducer,
    bank: BankReducer,
    form: FormReducer
})

export default rootReducer