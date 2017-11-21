import Entry from '../models/entry';
import Feed from '../models/feed';
import axios from 'axios';

export default class EntriesService {
  static async list(categoryId: number, feedId: number): Promise<Array<Entry>> {
    const response = await axios.get(`categories/${categoryId}/feeds/${feedId}/entries`);
    return response.data;
  }

  static async find(categoryId: number, feedId: number, entryId: number): Promise<Entry> {
    const response = await axios.get(`categories/${categoryId}/feeds/${feedId}/entries/${entryId}`);
    return response.data;
  }

  static async refresh(feed: Feed): Promise<Array<Entry>> {
    const response = await axios.post(`categories/${feed.category_id}/feeds/${feed.id}/entries`);
    return response.data;
  }
}