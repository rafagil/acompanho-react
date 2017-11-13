import { combineReducers } from 'redux';
import CategoriesReducer from './menu/categories.reducer';
import SelectedFeedReducer from './menu/selected-feed.reducer';
import EntriesReducer from './entries/entries.reducer';
import SelectedEntryReducer from './entries/selected-entry.reducer';

export default combineReducers({
  categories: CategoriesReducer,
  selectedFeed: SelectedFeedReducer,
  entries: EntriesReducer,
  selectedEntry: SelectedEntryReducer
})