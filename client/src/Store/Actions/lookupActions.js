export const getFrequencies = () => {
  return (dispatch, getState) => {
    fetch('/api/lookups/frequencies')
    .then(res => res.json())
    .then((frequencies) => dispatch({type:"SET_FREQUENCIES", frequencies}))
    .catch(dispatch({type:"ERROR"}))
  }
}

export const getCurrencies = () => {
  return (dispatch, getState) => {
    fetch('/api/lookups/currencies')
    .then(res => res.json())
    .then((currencies) => dispatch({type:"SET_CURRENCIES", currencies}))
    .catch(dispatch({type:"ERROR"}))
  }
}

export const getStatuses = () => {
  return (dispatch, getState) => {
    fetch('/api/lookups/statuses')
    .then(res => res.json())
    .then((statuses) => dispatch({type:"SET_STATUSES", statuses}))
    .catch(dispatch({type:"ERROR"}))
  }
}
