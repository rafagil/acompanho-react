import Category from '../models/category';
import Feed from '../models/feed';
import Entry from '../models/entry';
import axios from 'axios';

export default class MenuService {

  static async findCategories(): Promise<Array<Category>> {
    const response = await axios.get('categories');
    return response.data;
  }

  static async findFeeds(categoryId: string): Promise<Array<Feed>> {
    const response = await axios.get(`categories/${categoryId}/feeds`);
    return response.data;
  }

  static async findEntries(categoryId:string, feedId: string): Promise<Array<Entry>> {
    const response = await axios.get(`categories/${categoryId}/feeds/${feedId}/entries`);
    return response.data;
  }
}