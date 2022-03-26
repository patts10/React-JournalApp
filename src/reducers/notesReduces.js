
/**
 * {
 *  notes: [],
 * active: null,
 * active: {
 * id: 'KJAHJS46848468',
 * title: '',
 * body: '',
 * imageUrl: '',
 * date: 157656247
 * }
 */

import { types } from "../types/types";

const initiaState = {
  notes: [],
  active: null
}

export const notesReducer = ( state = initiaState, action ) => {

  switch (action.type) {
    
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        } 
      }

    case types.notesLoad:
      return {
        ...state,
        notes: [ ...action.payload ]
      }

      case types.notesUpdated:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                        ? action.payload.note
                        : note
                )
            };
    
    default:
      return state;
  }

}