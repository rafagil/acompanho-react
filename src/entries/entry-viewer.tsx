import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router-dom';
import { selectEntry } from './entries.actions';
import EntryService from './entries.service';
import Entry from '../models/entry';

interface EntryProps {
  entry: Entry;
  match: match<any>;
  selectEntry(entry: Entry);
}

class EntryViewer extends React.Component<EntryProps> {

  constructor(props: EntryProps) {
    super(props);
    if (!props.entry) {
      this.findEntry();
    }
  }

  async findEntry() {
    const { id, feedId, categoryId } = this.props.match.params;
    this.props.selectEntry(await EntryService.find(categoryId, feedId, id));
  }

  render() {
    const { entry, match } = this.props;
    if (entry) {
      return <div>{entry.summary}</div>
    } else if (match && match.params.id) {
      return <div>Loading...</div>;
    }
    return null;
  }
}

export default connect(state => ({ entry: state.selectedEntry }), { selectEntry })(EntryViewer);