import { Types } from '../actions';
import Category from '../models/category';
import Feed from '../models/feed';

export function updateCategories(categories: Category[]) {
  return { type: Types.UPDATE_CATEGORIES, categories };
}

export function updateFeeds(categoryId: string, feeds: Feed[]) {
  return { type: Types.UPDATE_FEEDS, feeds, categoryId }
}

export function selectFeed(feed: Feed) {
  return { type: Types.SELECT_FEED, feed };
}