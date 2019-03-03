export const getFrequencies = () => {
  return (dispatch, getState) => {
    const { frequencies } = getState().lookup;
    if(frequencies === null){
      fetch('/api/lookups/frequencies')
      .then(res => res.json())
      .then((frequencies) => dispatch({type:"SET_FREQUENCIES", frequencies}))
      .catch(dispatch({type:"ERROR"}))
    } else {
      dispatch({type:"DEFAULT"});
    }
  }
}

export const getCurrencies = () => {
  return (dispatch, getState) => {
    const { currencies } = getState().lookup;
    if(currencies === null){
      fetch('/api/lookups/currencies')
      .then(res => res.json())
      .then((currencies) => dispatch({type:"SET_CURRENCIES", currencies}))
      .catch(dispatch({type:"ERROR"}))
    } else {
      dispatch({type:"DEFAULT"});
    }
  }
}

export const getStatuses = () => {
  return (dispatch, getState) => {
    const { statuses } = getState().lookup;
    if(statuses === null){
      fetch('/api/lookups/statuses')
      .then(res => res.json())
      .then((statuses) => dispatch({type:"SET_STATUSES", statuses}))
      .catch(dispatch({type:"ERROR"}))
    } else {
      dispatch({type:"DEFAULT"});
    }
  }
}
