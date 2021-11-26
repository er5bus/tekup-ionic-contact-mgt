export const deepEqual = (objA: any, objB: any): any => {
  for (let keyA in objA) {
    if (isObject(objA[keyA]) && isObject(objB[keyA])) {
      return deepEqual(objA[keyA], objB[keyA])
    }else if (objB[keyA] === objA[keyA]){
      return true
    }
  }
  return false
}

export const isObject = (obj: Object) => obj != null && typeof obj === 'object'

export const checkForDuplication = (contact: any, contactsByCategory: any) => Object.values(contactsByCategory).some(
  (category: any) => category.contacts.some((item: any) => deepEqual(contact, item))
)
