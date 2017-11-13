import Entry from '../models/entry';
import { Types } from '../actions';
interface EntryAction {
  type: Types;
  entries: Array<Entry>;
}
export default (state: Array<Entry> | null = null, action: EntryAction) => {
  switch (action.type) {
    case Types.UPDATE_ENTRIES:
      return action.entries;
  }
  return state;
}