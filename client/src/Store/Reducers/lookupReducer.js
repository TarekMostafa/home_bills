const initState = {
  frequencies: null,
  currencies: null,
  statuses: null
}

const lookupReducer = (state=initState, action) => {
  switch (action.type) {
    case 'SET_FREQUENCIES':
      return {
        ...state,
        frequencies: action.frequencies
      };
    case 'SET_CURRENCIES':
      return {
        ...state,
        currencies: action.currencies
      };
    case 'SET_STATUSES':
      return {
        ...state,
        statuses: action.statuses
      };
    default:
      return state;
  }
}

export default lookupReducer;
