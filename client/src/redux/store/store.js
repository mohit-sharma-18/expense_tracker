import { createStore, combineReducers } from 'redux'
import toastReducer from './reducer'

const rootStore = combineReducers({
    toast: toastReducer
})
const store = createStore(rootStore)
console.log('store',store);


export default store
