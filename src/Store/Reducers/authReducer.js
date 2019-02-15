const initState = {
  loggedUser: null
}

const authReducer = (state=initState, action) => {
  if(action.type === "SET_LOGGED_USER") {
    return {
      ...state,
      loggedUser: action.user
    }
  }
  return state;
}

export default authReducer;
