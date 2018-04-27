import React, { Component } from 'react'
import ReduxThunk from 'redux-thunk'
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import reducers from "./Redux/reducers"
import promise from 'redux-promise'
import Calculator from './Components/Calculator'


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class App extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Calculator />
      </Provider>
    );
  }
}

export default App;
