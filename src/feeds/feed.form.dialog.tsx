import * as React from 'react';
import { connect } from 'react-redux';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { MenuItem } from 'material-ui/Menu';
import { hideFeedDialog } from './feeds.actions';
import Select from 'material-ui/Select';
import Category from '../models/category';
import Feed from '../models/feed';
import FeedService from './feeds.service';
import { updateFeeds } from './feeds.actions';

interface FeedFormDialogProps {
  open: boolean;
  categories: Array<Category>;
  hideFeedDialog();
  updateFeeds(categoryId: number, feeds: Array<Feed>);
}

class FeedFormDialog extends React.Component<FeedFormDialogProps> {

  state = {
    url: '',
    categoryId: -1
  }

  close() {
    this.props.hideFeedDialog();
  }

  async addFeed() {
    try {
      const { categoryId, url } = this.state;
      await FeedService.add(categoryId, { url });
      this.props.updateFeeds(categoryId, await FeedService.findFeeds(categoryId));
      this.setState({ url: '' });
      this.close();
    } catch (e) {
      console.log(e);
      alert('Failed to add feed. Please, try again later.');
    }
  }

  render() {
    const { open, categories } = this.props;
    return (
      <Dialog open={open} onRequestClose={() => this.close()} >
        <DialogTitle>Add Feed</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new feed, put the feed URL in the field below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="feedUrl"
            label="Feed URL"
            type="url"
            fullWidth
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
          />
          Category:
          <Select value={this.state.categoryId} onChange={(e) => this.setState({ categoryId: e.target.value })}>
            {categories.map(category => (
              <MenuItem key={`ct_${category.id}`} value={category.id}>{category.name}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.close()} color="primary">Cancel</Button>
          <Button onClick={() => this.addFeed()} color="primary">Add</Button>
        </DialogActions>
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  open: state.feedDialogOpen,
  categories: state.categories
})

export default connect(mapStateToProps, { hideFeedDialog, updateFeeds })(FeedFormDialog);