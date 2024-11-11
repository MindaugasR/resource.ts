import Resource from '../Resource';

export type Author = {
  id: number;
  name: string;
  email: string;
};

export type AuthorResourceData = {
  id: number;
  name: string;
};

export class AuthorResource extends Resource<Author, AuthorResourceData> {
  protected format(item: Author): AuthorResourceData {
    return {
      id: item.id,
      name: item.name,
    };
  }
}
