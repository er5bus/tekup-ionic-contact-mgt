export type ContactType = {
  id: number,
  category: string,
  firstName: string,
  lastName: string,
  firstPhoneNumber: string,
  secondPhoneNumber: string,
  createdAt: Date,
  updatedAt: Date
}

export type ErrorType = {
  duplicationError: boolean
}

export type SearchType = {
  searchText: string,
  category: string
}

export type SuccessActionsType = {
  isCreated: boolean,
  isUpdated: boolean
}

export type CategoriesType = {
  id?: number,
  contacts: Array<ContactType>
}

export type ContactsByCategoryType = {
  [category: string]: any
}

export type CategoryType = {
  category: string
}

export type Actions = {
  type: string,
  payload?: any,  
}
