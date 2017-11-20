import * as React from 'react';
import { connect } from 'react-redux';
import { History } from 'history';
import { match } from 'react-router-dom';
import Typography from 'material-ui/Typography';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import RefreshIcon from 'material-ui-icons/Refresh';
import Feed from '../models/feed';
import Entry from '../models/entry';
import EntriesService from './entries.service';
import FeedsService from '../feeds/feeds.service';
import List, { ListItem, ListItemText } from 'material-ui/List';
import { updateEntries } from './entries.actions';
import { selectFeed } from '../feeds/feeds.actions';
import './entries.css';

interface EntriesProps {
  feed: Feed;
  entries: Array<Entry>;
  classes: any;
  history: History;
  match: match<any>;
  updateEntries(entries: Array<Entry>);
  selectFeed(feed: Feed);
}

class Entries extends React.Component<EntriesProps> {

  private firstMount: boolean = true;

  showEntry(entry) {
    const { feed } = this.props;
    this.props.history.push(`/categories/${feed.category_id}/feeds/${feed.id}/entries/${entry.id}`);
  }

  componentDidMount() {
    this.updateEntries(this.props);
  }

  async componentWillReceiveProps(nextProps) {
    if (!this.firstMount && nextProps.feed && (!this.props.feed || this.props.feed.id !== nextProps.feed.id)) {
      await this.updateEntries(nextProps);
      this.forceUpdate();
    }
    this.firstMount = false; //Prevents from calling API twice (perhaps there is a better way for doing this)
  }

  async updateEntries(props: EntriesProps) {
    let { feed } = props;
    if (!feed) {
      feed = await this.findFeed();
    }
    this.props.updateEntries(await EntriesService.list(feed.category_id, feed.id));
  }

  async findFeed(): Promise<Feed> {
    const { id, categoryId } = this.props.match.params;
    const feed = await FeedsService.find(categoryId, id);
    this.props.selectFeed(feed);
    return feed;
  }

  async refreshFeed(feed: Feed) {
    try {
      await EntriesService.refresh(feed);
      this.props.updateEntries(await EntriesService.list(feed.category_id, feed.id));
    } catch (e) {
      console.log(e);
      alert('Failed to update. Please, try again later.');
    }
  }

  render() {
    const { feed, entries } = this.props;
    return (
      <div className="entries">
        <AppBar className="appBar">
          <Toolbar>
            <Typography type="title" className="title" color="inherit" noWrap>
              {feed ? feed.title : 'No feed selected'}
            </Typography>
            {feed ?
              <IconButton onClick={() => this.refreshFeed(feed)} color="contrast">
                <RefreshIcon />
              </IconButton>
              : null}
          </Toolbar>
        </AppBar>
        <div className="entriesContent">
          <List>
            {entries ? entries.map(entry => (
              <ListItem key={`ent_${entry.id}`} button onClick={() => this.showEntry(entry)}>
                <ListItemText primary={entry.title} secondary={entry.summary} />
              </ListItem>
            )) : null}
          </List>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  feed: state.selectedFeed,
  entries: state.entries
})

export default connect(mapStateToProps, { updateEntries, selectFeed })(Entries);