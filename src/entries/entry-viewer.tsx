import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { match } from 'react-router-dom';
import { selectEntry } from './entries.actions';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import ChevronLeft from 'material-ui-icons/ChevronLeft';
import EntryService from './entries.service';
import Entry from '../models/entry';

interface EntryProps {
  history: History;
  entry: Entry;
  match: match<any>;
  selectEntry(entry: Entry);
}

class EntryViewer extends React.Component<EntryProps> {

  constructor(props: EntryProps) {
    super(props);
    this.findEntry();
  }

  async findEntry() {
    const { id, feedId, categoryId } = this.props.match.params;
    this.props.selectEntry(await EntryService.find(categoryId, feedId, id));
  }

  render() {
    const { entry, match } = this.props;
    if (entry) {
      return (
        <div className="entries">
          <AppBar className="appBar">
            <Toolbar>
              <IconButton onClick={() => this.props.history.goBack()} color="contrast">
                <ChevronLeft />
              </IconButton>
              <Typography type="title" color="inherit" noWrap>
                {entry.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="entriesContent" dangerouslySetInnerHTML={{ __html: entry.description }} />
        </div>
      )
    } else if (match && match.params.id) {
      return <div>Loading...</div>;
    }
    return null;
  }
}

export default connect(state => ({ entry: state.selectedEntry }), { selectEntry })(EntryViewer);