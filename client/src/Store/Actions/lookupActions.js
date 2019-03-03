import LookupRequest from '../../Axios/LookupRequest';

const lookupRequest = new LookupRequest();

export const getFrequencies = () => {
  return (dispatch, getState) => {
    lookupRequest.getFrequencies()
    .then((frequencies) => dispatch({type:"SET_FREQUENCIES", frequencies}))
    .catch(dispatch({type:"ERROR"}))
  }
}

export const getCurrencies = () => {
  return (dispatch, getState) => {
    lookupRequest.getCurrencies()
    .then((currencies) => dispatch({type:"SET_CURRENCIES", currencies}))
    .catch(dispatch({type:"ERROR"}))
  }
}

export const getStatuses = () => {
  return (dispatch, getState) => {
    lookupRequest.getStatuses()
    .then((statuses) => dispatch({type:"SET_STATUSES", statuses}))
    .catch(dispatch({type:"ERROR"}))
  }
}
