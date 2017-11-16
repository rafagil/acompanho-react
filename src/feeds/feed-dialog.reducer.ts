import { Types } from '../actions';
interface FeedAction {
  type: Types;
}
export default (state: boolean = false, action: FeedAction): boolean => {
  switch (action.type) {
    case Types.SHOW_FEED_DIALOG:
      return true;
    case Types.HIDE_FEED_DIALOG:
      return false;
  }
  return state;
}