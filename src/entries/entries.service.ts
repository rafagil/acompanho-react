import Entry from '../models/entry';
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
}