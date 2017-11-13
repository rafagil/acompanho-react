import * as React from 'react';
import { connect } from 'react-redux';
import Entry from '../models/entry';

interface EntryProps {
  entry: Entry;
}

class EntryViewer extends React.Component<EntryProps> {
  render() {
    const { entry } = this.props;
    if (entry) {
      return <div>{entry.summary}</div>
    }
    return null;
  }
}

export default connect(state => ({ entry: state.selectedEntry }))(EntryViewer);