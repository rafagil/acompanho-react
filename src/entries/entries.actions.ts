import { Types } from '../actions'
import Entry from '../models/entry';

export function updateEntries(entries: Array<Entry>) {
  return { type: Types.UPDATE_ENTRIES, entries };
}

export function selectEntry(entry: Entry) {
  return { type: Types.SELECT_ENTRY, entry };
}