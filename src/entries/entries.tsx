import * as React from 'react';
import { connect } from 'react-redux';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Feed from '../models/feed';
import Entry from '../models/entry';
import MenuService from '../menu/menu.service';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { updateEntries, selectEntry } from './entries.actions';
import EntryViewer from './entry-viewer';
import './entries.css';

interface EntriesProps {
  feed: Feed;
  entries: Array<Entry>;
  classes: any;
  updateEntries(entries: Array<Entry>);
  selectEntry(entry: Entry);
}

class Entries extends React.Component<EntriesProps> {

  showEntry(entry) {
    this.props.selectEntry(entry);

  }

  async componentWillReceiveProps(nextProps) {
    const feed = nextProps.feed;
    if (feed && (!this.props.feed || feed.id != this.props.feed.id)) {
      this.props.updateEntries(await MenuService.findEntries(feed.category_id, feed.id));
    }
  }

  render() {
    return (
      <div className="entries">
        <AppBar className="appBar">
          <Toolbar>
            <Typography type="title" color="inherit" noWrap>
              {this.props.feed ? this.props.feed.title : 'No feed selected'}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          {this.props.entries ? this.props.entries.map(entry => (
            <ListItem key={`ent_${entry.id}`} button onClick={() => this.showEntry(entry)}>
              <ListItemText primary={entry.title} />
            </ListItem>
          )) : null}
        </List>
        <EntryViewer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  feed: state.selectedFeed,
  entries: state.entries
})

export default connect(mapStateToProps, { updateEntries, selectEntry })(Entries);