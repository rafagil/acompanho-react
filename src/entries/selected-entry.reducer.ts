import Entry from '../models/entry';
import { Types } from '../actions';
interface EntryAction {
  type: Types;
  entry: Entry;
}
export default (state: Entry | null = null, action: EntryAction) => {
  switch (action.type) {
    case Types.SELECT_ENTRY:
      return action.entry;
  }
  return state;
}