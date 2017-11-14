import Category from '../models/category';
import Feed from '../models/feed';
import axios from 'axios';

export default class MenuService {

  static async findCategories(): Promise<Array<Category>> {
    const response = await axios.get('categories');
    return response.data;
  }

  static async findFeeds(categoryId: number): Promise<Array<Feed>> {
    const response = await axios.get(`categories/${categoryId}/feeds`);
    return response.data;
  }
}