import { ADD_TODO, DELETE_TODO, EDIT_TODO, COMPLETE_TODO, COMPLETE_ALL, CLEAR_COMPLETED } from '../constants/actionTypes';

const initialState = [
  {
    text: 'aaaaaaaaaaa',
    completed: true,
    id: 0
  }
]

export default function todos(state = initialState, action) {
  switch(action.type) {
    case ADD_TODO:
      return [
        {
          text: action.text,
          completed: false,
          id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1
        },
        ...state
      ]

    case DELETE_TODO:
      return state.filter(todo => todo.id !== action.id)

    case COMPLETE_TODO:
      return state.map(todo =>
        todo.id === action.id ? Object.assign({}, todo, { completed: !todo.completed}) : todo
      )

    default:
      return state
  }
}