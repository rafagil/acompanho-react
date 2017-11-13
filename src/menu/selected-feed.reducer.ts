import Feed from '../models/feed';
import { Types } from '../actions';
interface FeedAction {
  type: Types;
  feed: Feed;
}
export default (state: Feed | null = null, action: FeedAction) => {
  switch (action.type) {
    case Types.SELECT_FEED:
      return action.feed;
  }
  return state;
}