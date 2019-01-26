export const addLoggedUser = (user) => {
  return {
    type:'ADD_LOGGED_USER',
    user
  }
}

export const removeLoggedUser = () => {
  return {
    type:'REMOVE_LOGGED_USER'
  }
}
