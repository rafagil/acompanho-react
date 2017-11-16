import { Types } from '../actions';
import Feed from '../models/feed';
import Category from '../models/category';

export function showFeedDialog() {
  return { type: Types.SHOW_FEED_DIALOG }
}

export function hideFeedDialog() {
  return { type: Types.HIDE_FEED_DIALOG }
}

export function updateFeeds(categoryId: string, feeds: Feed[]) {
  return { type: Types.UPDATE_FEEDS, feeds, categoryId }
}

export function selectFeed(feed: Feed) {
  return { type: Types.SELECT_FEED, feed };
}

export function updateCategories(categories: Category[]) {
  return { type: Types.UPDATE_CATEGORIES, categories };
}