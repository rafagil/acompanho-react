export default interface Feed {
  id: number;
  title: string;
  description: string;
  link: string;
  url: string;
  failedUpdate: boolean;
  category_id: number;
}