import { omit, concat, map, filter, assign } from "lodash"
import {checkForDuplication} from "../utils"

import { ADD_CONTACT, CLEAR_STATE, ADD_CATEGORY, EDIT_CONTACT, EDIT_CATEGORY, REMOVE_CONTACT, REMOVE_CATEGORY, SEARCH_CONTACT } from "./constant"
import { Actions, ErrorType, SearchType, SuccessActionsType, ContactType, ContactsByCategoryType } from "./type"

export interface StateInterface {
  search: SearchType;
  success: SuccessActionsType;
  error: ErrorType;
  contactsByCategory: ContactsByCategoryType;
}

export const initialState: StateInterface = {
  search: {
    searchText: "",
    category: ""
  },
  error: {
    duplicationError: false,
  },
  success: {
    isCreated: false,
    isUpdated: false,
  },
  contactsByCategory: {
    friends: {
      id: 1,
      contacts: [],
    },
    family: {
      id: 2,
      contacts: [],
    },
    professional: {
      id: 3,
      contacts: [],
    },
    other: {
      id: 4,
      contacts: [],
    }
  }
}


export const contactReducer = (state: StateInterface = initialState, action: Actions): StateInterface => {

  window.localStorage['persistedState'] = JSON.stringify({ ...state })

  switch(action.type) {

    case CLEAR_STATE: {
      return { ...state, success: { isCreated: false, isUpdated: false }, error: { duplicationError: false } }
    }
    case SEARCH_CONTACT: {
      const { searchText, category } = action.payload
      return {
        ...state,
        search: { searchText, category }
      }
    }
    case ADD_CONTACT: {
      const { category, ...contact } = action.payload
      if (checkForDuplication(contact, state.contactsByCategory)){
        return { ...state, error: { duplicationError: true } }
      }
      return { 
        ...state, 
        success: { isCreated: true, isUpdated: false },
        contactsByCategory: { ...state.contactsByCategory, [category] : { 
          ...(state.contactsByCategory[category]||{}), 
          contacts: concat(state.contactsByCategory[category]?.contacts || [], [({ ...contact, createdAt: new Date(), updatedAt: new Date()})]) } 
        } 
      }
    }
    case EDIT_CONTACT: {
      const { category, ...contact } = action.payload
      return { 
        ...state, 
        success: { isCreated: true, isUpdated: false },
        contactsByCategory: { ...state.contactsByCategory, [category] : {
          ...(state.contactsByCategory[category]||{}),
          contacts: map(state.contactsByCategory[category]?.contacts || [], 
          (item: ContactType) => item.id === contact.id ? ({ ...contact, updatedAt: new Date()}) : item) }
        }
      };
    }
    case REMOVE_CONTACT: {
      const { category, ...contact } = action.payload
      return { 
        ...state, 
        success: { isCreated: true, isUpdated: false },
        contactsByCategory: filter(state.contactsByCategory[category]?.contacts||[], (item: ContactType) => item.id !== contact.id) 
      };
    }

    case ADD_CATEGORY: {
      const { category, id } = action.payload
      return {
        ...state,
        contactsByCategory: assign(state.contactsByCategory, {[category]: { id, concats : [] }})
      };
    }
    case EDIT_CATEGORY: {
      const { category } = action.payload
      return {
        ...state,
        contactsByCategory: assign(state.contactsByCategory, {[category]: state.contactsByCategory[category] })
      };
    }
    case REMOVE_CATEGORY: {
      const { category } = action.payload
      return {
        ...state,
        contactsByCategory: omit(state.contactsByCategory, category)
      };
    }

    default : {
      return state
    }
  }
}
