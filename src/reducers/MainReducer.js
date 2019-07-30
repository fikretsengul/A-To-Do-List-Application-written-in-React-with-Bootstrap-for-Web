import { combineReducers } from 'redux'
import todos from './TodoReducer'
import visibilityFilter from './FilterReducer'
import others from './OtherReducer'

export default combineReducers({
  todos,
  visibilityFilter,
  others
})