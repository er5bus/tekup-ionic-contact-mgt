import { useMemo } from "react"
import { filter, isEmpty } from "lodash";
import { useContext, createContext, useReducer } from "react";
import { ContactsByCategoryType, SuccessActionsType, contactReducer, initialState, ADD_CONTACT, CLEAR_STATE, SEARCH_CONTACT, EDIT_CONTACT, ContactType, ErrorType } from "./../store"

interface ContactContextInterface {
  error: ErrorType,
  success: SuccessActionsType,
  contactsByCategory: ContactsByCategoryType
}

const ContactCtx = createContext<ContactContextInterface | null>(null);

export const useContactCtx = () => useContext(ContactCtx)

interface ProviderProps {
  children?: JSX.Element,
};

const persistedState = JSON.parse(window.localStorage['persistedState']||"{}");

export const ContactUIProvider: React.FC<ProviderProps> = ({ children }) => {
  
  const [state, _dispatch] = useReducer(contactReducer, { ...initialState, ...persistedState })

  const contactsByCategory = useMemo(() => {
    if (isEmpty(state?.search?.searchText) || isEmpty(state?.search?.category)){
      return state.contactsByCategory
    }

    const { category, searchText } = state.search

    const regx = new RegExp( searchText, 'ig' )
    return { ...state.contactsByCategory, [category] : {
          ...(state.contactsByCategory[category]||{}),
          contacts: filter(state.contactsByCategory[category]?.contacts || [], 
          (item: ContactType) => (regx.test(item.firstName) || regx.test(item.lastName) || regx.test(item.firstPhoneNumber) || regx.test(item.secondPhoneNumber) )) }
        }
  }, [state.search])

  const addContact = (payload: Object) => _dispatch({ type: ADD_CONTACT, payload })
  const editContact = (payload: Object) => _dispatch({ type: EDIT_CONTACT, payload })
  const searchContact = (payload: Object) => _dispatch({ type: SEARCH_CONTACT, payload })
  const clearState = () => _dispatch({ type: CLEAR_STATE })

  const value = {
    ...state,
    addContact,
    editContact,
    searchContact,
    clearState,
    contactsByCategory
  }


  return (
    <ContactCtx.Provider value={value}>
      {children}
    </ContactCtx.Provider>
  )
}
