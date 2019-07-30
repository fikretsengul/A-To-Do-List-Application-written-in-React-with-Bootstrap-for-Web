import { IS_LOADING } from '../actions/actionsTypes'

const others = (state={loaded: false}, action) => {
    switch (action.type){
        case IS_LOADING: 
        return {...state, loaded: action.bool}
        default:
        return state
    }
}

export default others