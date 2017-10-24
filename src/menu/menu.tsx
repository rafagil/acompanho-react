import * as React from 'react';
import { Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import Category from '../models/category';
import Feed from '../models/feed';
import MenuService from './menu.service';
import { updateCategories, updateFeeds } from './menu.actions';

const { SubMenu } = Menu;

interface MenuProps {
  categories: Array<Category>;
  selectedCategory: Category;
  updateCategories(categories: Category[]);
  updateFeeds(categoryId: string, feeds: Feed[]);
}

class SideMenu extends React.Component<MenuProps> {

  private fetchedFeeds: string[] = [];

  async componentDidMount() {
    const categories = await MenuService.findCategories();
    this.props.updateCategories(categories);
  }

  async findFeeds(event: string[]) {
    for (let i = 0; i < event.length; i++) {
      const categoryId = event[i];
      if (this.fetchedFeeds.indexOf(categoryId) < 0) {
        const feeds = await MenuService.findFeeds(categoryId);
        this.props.updateFeeds(categoryId, feeds);
        this.fetchedFeeds = [...this.fetchedFeeds, categoryId];
      }
    }
  }

  selectFeed(event) {

  }

  render() {
    const { categories } = this.props;
    return (
      <Menu onOpenChange={(e) => this.findFeeds(e)} onClick={(e) => this.selectFeed(e)} style={{ width: 240 }} mode="inline">
        {categories.map(category => (
          <SubMenu key={category.id} title={<span><Icon type="appstore" /><span>{category.name}</span></span>}>
            {category.feeds ? category.feeds.map(feed => (
              <Menu.Item key={feed.id}>{feed.title}</Menu.Item>
            )) : null}
          </SubMenu>
        ))}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { updateCategories, updateFeeds })(SideMenu);