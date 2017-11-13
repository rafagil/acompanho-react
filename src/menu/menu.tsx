import * as React from 'react';
import { connect } from 'react-redux';
import Category from '../models/category';
import Feed from '../models/feed';
import MenuService from './menu.service';
import { updateCategories, updateFeeds, selectFeed } from './menu.actions';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import Collapse from 'material-ui/transitions/Collapse';
import './menu.css';

interface MenuProps {
  categories: Array<Category>;
  selectedCategory: Category;
  updateCategories(categories: Category[]);
  updateFeeds(categoryId: number, feeds: Feed[]);
  selectFeed(feed: Feed);
}

class SideMenu extends React.Component<MenuProps> {

  private fetchedFeeds: number[] = [];
  private categoryStates: Array<{ isLoading: boolean, isOpen: boolean }>;

  constructor(props) {
    super(props);
    this.categoryStates = [];
  }

  async componentDidMount() {
    const categories = await MenuService.findCategories();
    this.props.updateCategories(categories);
  }

  getCategoryState(categoryId: number) {
    if (!this.categoryStates[categoryId]) {
      this.categoryStates[categoryId] = { isLoading: false, isOpen: false };
    }
    return this.categoryStates[categoryId];
  }

  async findFeeds(category: Category) {
    const categoryId = category.id;
    const categoryState = this.getCategoryState(categoryId);

    categoryState.isOpen = !categoryState.isOpen;
    categoryState.isLoading = true;
    if (this.fetchedFeeds.indexOf(categoryId) < 0) {
      const feeds = await MenuService.findFeeds(categoryId);
      this.props.updateFeeds(categoryId, feeds);
      this.fetchedFeeds = [...this.fetchedFeeds, categoryId];
    }
    categoryState.isLoading = false;
    this.forceUpdate();
  }

  renderLoading() {
    return (
      <ListItem>
        <ListItemText primary="Loading..." />
      </ListItem>
    )
  }

  selectFeed(feed: Feed) {
    this.props.selectFeed(feed);
  }

  render() {
    const { categories } = this.props;
    return (
      <Drawer type="permanent">
        <div>
          <List className="menu">
            {categories.map(category => (
              <div>
                <ListItem button onClick={() => this.findFeeds(category)}>
                  <ListItemText primary={category.name} />
                  {this.getCategoryState(category.id).isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Divider />
                <Collapse in={this.getCategoryState(category.id).isOpen} unmountOnExit>
                  {category.feeds && category.feeds.length ? category.feeds.map(feed => (
                    <ListItem key={`feed_${feed.id}`} button onClick={() => this.selectFeed(feed)}>
                      <ListItemText primary={feed.title} />
                    </ListItem>
                  )) : this.getCategoryState(category.id).isLoading ? this.renderLoading() : <p>You don't have any feeds on this category</p>}
                </Collapse>
              </div>
            ))}
          </List>
        </div>
      </Drawer>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { updateCategories, updateFeeds, selectFeed })(SideMenu);