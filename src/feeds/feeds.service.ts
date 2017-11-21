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

  static async findAll(): Promise<Array<Feed>> {
    const response = await axios.get('feeds');
    return response.data;
  }

  static async add(categoryId: number, feed: { url: string }): Promise<Feed> {
    const response = await axios.post(`categories/${categoryId}/feeds`, feed);
    return response.data;
  }

  static async find(categoryId: number, feedId: number): Promise<Feed> {
    const response = await axios.get(`categories/${categoryId}/feeds/${feedId}`);
    return response.data;
  }
}