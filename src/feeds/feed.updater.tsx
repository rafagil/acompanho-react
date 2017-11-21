import * as React from 'react';
import EntriesService from '../entries/entries.service';
import FeedService from './feeds.service';

const TIMEOUT = 300000;

class FeedUpdater extends React.Component {

  async refreshFeeds() {
    const feeds = await FeedService.findAll();
    for (const feed of feeds) {
      EntriesService.refresh(feed);
    }
  }

  componentDidMount() {
    this.refreshFeeds();
    setInterval(() => this.refreshFeeds(), TIMEOUT);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

export default FeedUpdater;