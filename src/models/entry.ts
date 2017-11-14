export default interface Entry {
  id: number;
  feed_id: number;
  title: string;
  summary: string;
  description: string;
  link: string;
  image: string;
  pubdate: string;
  starred: boolean;
  unread: boolean;
}