import { combineReducers } from 'redux';
import CategoriesReducer from './menu/categories.reducer';

export default combineReducers({
  categories: CategoriesReducer
})