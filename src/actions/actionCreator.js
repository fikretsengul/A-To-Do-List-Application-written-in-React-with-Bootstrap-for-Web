import { SET_VISIBILITY_FILTER } from './actionsTypes'
import db from '../config/firebase';

// export const addAction = (id, text) => ({
//     type: ADD_TODO,
//     id,
//     text,
//     completed: false
// })

export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  filter
})

export const addTodo = (id, text) => {
    return async (dispatch) => {
        try {
            await db.ref('todos/'+id).set({
                text: text,
                completed: false
            })
            dispatch(getTodos())
        } catch (e) {
            console.log(e)
        }
    }
}

export const removeTodo = (id) => {
    return async (dispatch) => {
        try {
            await db.ref('todos/'+id).remove()
            dispatch({type: 'REMOVE_TODO', id: id})
        } catch (e) {
            console.log(e)
        }
    }
}

export const toggleTodo = (id, completed) => {
    return async (dispatch) => {
        try {
            completed ? 
                await db.ref('todos/'+id).update({completed: false}) :
                await db.ref('todos/'+id).update({completed: true})
            dispatch({type: 'TOGGLE_TODO', id: id})
        } catch (e) {
            console.log(e)
        }
    }
}

export const updateTodo = (id, text) => {
    return async () => {
        try {
            await db.ref('todos/'+id).update({text: text})
        } catch (e) {
            console.log(e)
        }
    }
}

export const getTodos = () => {
    return async (dispatch, getState) => {
        try {
            const state = getState().todos
            await db.ref('todos').once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    if (!state.find(todo=>todo.id === childSnapshot.key)) {
                        dispatch({type: 'ADD_TODO', id: childSnapshot.key, text: childSnapshot.val().text, completed: childSnapshot.val().completed})
                    }
                });
            console.log(getState().todos)
            dispatch({type: 'IS_LOADING', bool: true})
            console.log(getState().todos)
            });
        } catch (e) {
            console.log(e)
        }
    }
}

// export const listenerTest = () => {
//     return async (dispatch, getState) => {
//         try {
//             db.ref('todos').on('child_added', data => {
//                 console.log("OK")
//               });
//         } catch (e) {
//             console.log(e)
//         }
//     }
// }