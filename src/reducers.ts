import { combineReducers } from 'redux';
import CategoriesReducer from './feeds/categories.reducer';
import SelectedFeedReducer from './feeds/selected-feed.reducer';
import EntriesReducer from './entries/entries.reducer';
import SelectedEntryReducer from './entries/selected-entry.reducer';
import FeedDialogReducer from './feeds/feed-dialog.reducer';

export default combineReducers({
  categories: CategoriesReducer,
  selectedFeed: SelectedFeedReducer,
  entries: EntriesReducer,
  selectedEntry: SelectedEntryReducer,
  feedDialogOpen: FeedDialogReducer
});