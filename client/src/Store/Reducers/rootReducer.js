import {combineReducers} from 'redux';

import authReducer from './authReducer';
import lookupReducer from './lookupReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  lookup: lookupReducer
})

export default rootReducer;
