import Resource from '../Resource';
import {
  AuthorResource,
  type Author,
  type AuthorResourceData,
} from './AuthorResource';

export type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export type PostResourceData = {
  id: number;
  title: string;
  body: string;
  author: AuthorResourceData | AuthorResourceData[];
};

const getAuthor = (id: number): Author | undefined =>
  authors.find((author) => author.id === id);

const authors: Author[] = [
  { id: 1, name: 'Author 1', email: '' },
  { id: 2, name: 'Author 2', email: '' },
  { id: 3, name: 'Author 3', email: '' },
];

export class PostResource extends Resource<Post, PostResourceData> {
  protected format(item: Post): PostResourceData {
    return {
      id: item.id,
      title: item.title,
      body: item.body,
      author: new AuthorResource(getAuthor(item.userId)).toJSON(),
    };
  }
}
