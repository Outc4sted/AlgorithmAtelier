import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import sortAlgorithm from './sortAlgorithm';


const rootReducer = combineReducers({
  routing,
  sortAlgorithm
});


export default rootReducer;
