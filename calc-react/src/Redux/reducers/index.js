import { combineReducers } from 'redux'
import GBPReducer from './gbp_reducer'
import BTCReducer from './btc_reducer'
import LimitReducer from './limit_reducer'
import { reducer as FormReducer} from 'redux-form'

const rootReducer = combineReducers({
    gbp: GBPReducer,
    btc: BTCReducer,
    limit: LimitReducer,
    form: FormReducer
})

export default rootReducer