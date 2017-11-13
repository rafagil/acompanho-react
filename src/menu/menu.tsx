import * as React from 'react';
import { connect } from 'react-redux';
import Category from '../models/category';
import Feed from '../models/feed';
import MenuService from './menu.service';
import { updateCategories, updateFeeds } from './menu.actions';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
// import Collapse from 'material-ui/transitions/Collapse';

interface MenuProps {
  categories: Array<Category>;
  selectedCategory: Category;
  updateCategories(categories: Category[]);
  updateFeeds(categoryId: number, feeds: Feed[]);
}

class SideMenu extends React.Component<MenuProps> {

  private fetchedFeeds: number[] = [];

  async componentDidMount() {
    const categories = await MenuService.findCategories();
    this.props.updateCategories(categories);
  }

  async findFeeds(category: Category) {
    const categoryId = category.id;
    if (this.fetchedFeeds.indexOf(categoryId) < 0) {
      const feeds = await MenuService.findFeeds(categoryId);
      this.props.updateFeeds(categoryId, feeds);
      this.fetchedFeeds = [...this.fetchedFeeds, categoryId];
    }
    this.forceUpdate();
  }

  selectFeed(event) {
    console.log(event);
  }

  render() {
    const { categories } = this.props;
    return (
      <Drawer type="permanent">
        <div>
          <div />
          <Divider />
          <List>
            {categories.map(category => (
              <div>
                <ListItem button onClick={() => this.findFeeds(category)}>
                  <ListItemText primary={category.name} />
                  {/* <Collapse in={!!category.feeds} unmountOnExit> */}

                  {/* </Collapse> */}
                </ListItem>
                {category.feeds ? category.feeds.map(feed => (
                  <ListItem button>
                    <ListItemText primary={feed.title} />
                  </ListItem>
                )) : null}
              </div>
            ))}
          </List>

        </div>
      </Drawer>
      // <Menu onOpenChange={(e) => this.findFeeds(e)} onClick={(e) => this.selectFeed(e)} style={{ width: 240 }} mode="inline">
      // {categories.map(category => (
      //   <SubMenu key={category.id} title={<span><Icon type="appstore" /><span>{category.name}</span></span>}>
      //     {category.feeds ? category.feeds.map(feed => (
      //       <Menu.Item key={feed.id}>{feed.title}</Menu.Item>
      //     )) : null}
      //   </SubMenu>
      // ))}
      // </Menu>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
});

export default connect(mapStateToProps, { updateCategories, updateFeeds })(SideMenu);