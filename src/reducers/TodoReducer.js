import { ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from '../actions/actionsTypes'

const todos = (state=[], action) => {
    switch (action.type){
        case ADD_TODO: 
        return state.length === 0 ? [...state, {id: action.id, text: action.text, completed: action.completed}] : state.find(todo=> todo.text === action.text) ? state : [...state, {id: action.id, text: action.text, completed: action.completed}]
        case TOGGLE_TODO:
        return state.map(todo =>
        (todo.id === action.id)
          ? {...todo, completed: !todo.completed}
          : todo
         )
        case REMOVE_TODO:
        return state.filter(todo => todo.id !== action.id);
        default:
        return state
    }
}

export default todos