import { expect, test, describe } from 'bun:test';
import Resource from '../src/Resource';

type Post = {
  id: number;
  title: string;
  author: string;
  date: string;
  content: string;
  secret: string;
};

type ReturnPost = {
  id: number;
  title: string;
  author: string;
};

const Post: Post = {
  id: 1,
  title: 'Hello World',
  author: 'John Doe',
  date: '2021-01-01',
  content: 'Hello World',
  secret: 'secret',
};

const Posts: Post[] = [
  {
    id: 1,
    title: 'Hello World',
    author: 'John Doe',
    date: '2021-01-01',
    content: 'Hello World',
    secret: 'secret',
  },
  {
    id: 2,
    title: 'Hello Second World',
    author: 'John Doe Jr.',
    date: '2021-01-02',
    content: 'Hello Second World',
    secret: 'top secret',
  },
];

class PostResource extends Resource<Post, ReturnPost> {
  format(item: Post): ReturnPost {
    return {
      id: item.id,
      title: item.title,
      author: item.author,
    };
  }
}

test('should return only 1 item', () => {
  const output = new PostResource(Post).toJSON();
  expect(output).toEqual({ id: 1, title: 'Hello World', author: 'John Doe' });
});

test('should return 2 items', () => {
  const output = new PostResource(Posts).toJSON();
  expect(output).toEqual([
    { id: 1, title: 'Hello World', author: 'John Doe' },
    { id: 2, title: 'Hello Second World', author: 'John Doe Jr.' },
  ]);
});

test('should return empty array if set empty array', () => {
  const output = new PostResource([]).toJSON();
  expect(output).toEqual([] as ReturnPost[]);
});

describe('should return empty object', () => {
  test('should return empty object if no argument set', () => {
    // @ts-ignore Error: Argument of type 'undefined' is not assignable to parameter of type 'Post | Post[]'.
    const output = new PostResource().toJSON();
    expect(output).toEqual({} as ReturnPost);
  });

  test('should return empty object if set empty object', () => {
    const output = new PostResource({} as Post).toJSON();
    expect(output).toEqual({} as ReturnPost);
  });

  test('should return empty object if argument is null', () => {
    // @ts-ignore Error: Argument of type 'null' is not assignable to parameter of type 'Post | Post[]'.
    const output = new PostResource(null).toJSON();
    expect(output).toEqual({} as ReturnPost);
  });

  test('should return empty object if argument is undefined', () => {
    // @ts-ignore Error: Argument of type 'undefined' is not assignable to parameter of type 'Post | Post[]'.
    const output = new PostResource(undefined).toJSON();
    expect(output).toEqual({} as ReturnPost);
  });

  test('should return empty object if argument is empty string', () => {
    // @ts-ignore Error: Argument of type 'string' is not assignable to parameter of type 'Post | Post[]'.
    const output = new PostResource('').toJSON();
    expect(output).toEqual({} as ReturnPost);
  });

  test('should return empty object if argument is number', () => {
    // @ts-ignore Error: Argument of type 'number' is not assignable to parameter of type 'Post | Post[]'.
    const output = new PostResource(1).toJSON();
    expect(output).toEqual({} as ReturnPost);
  });
});
