import Feed from './feed';
export default interface Category {
  id: number;
  name: string;
  description: string;
  feeds: Array<Feed>;
}