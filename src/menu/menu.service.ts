import Category from '../models/category';
import Feed from '../models/feed';
import axios from 'axios';

export default class MenuService {

  static async findCategories(): Promise<Array<Category>> {
    const response = await axios.get('/rest/categories');
    return response.data;
  }

  static async findFeeds(categoryId: string): Promise<Array<Feed>> {
    const response = await axios.get(`/rest/categories/${categoryId}/feeds`);
    return response.data;
  }
}