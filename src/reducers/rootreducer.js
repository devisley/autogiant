import { combineReducers } from 'redux'
import { garageReducer } from './garage'

export const rootReducer = combineReducers({
  garage: garageReducer,
});