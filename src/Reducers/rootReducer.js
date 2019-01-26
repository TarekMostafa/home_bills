const initState = {
  loggedUser: null
}

const rootReducer = (state=initState, action) => {
  if(action.type === "ADD_LOGGED_USER") {
    return {
      ...state,
      loggedUser: action.user
    }
  }
  if(action.type === "REMOVE_LOGGED_USER") {
    return {
      ...state,
      loggedUser: null
    }
  }
  return state;
}

export default rootReducer;
