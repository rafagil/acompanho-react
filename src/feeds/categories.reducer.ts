import Category from '../models/category';
import Feed from '../models/feed';
import { Types } from '../actions';
interface MenuAction {
  type: Types;
  categories: Array<Category>;
  categoryId: number;
  feeds: Array<Feed>;
}
export default (state: Array<Category> = [], action: MenuAction) => {
  switch (action.type) {
    case Types.UPDATE_CATEGORIES:
      return action.categories;
    case Types.UPDATE_FEEDS:
      return state.map(category => {
        if (category.id == action.categoryId) {
          return { ...category, feeds: action.feeds };
        }
        return category;
      })
  }
  return state;
}