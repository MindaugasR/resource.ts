import { PostResource, type Post } from './PostResource';

const posts: Post[] = [
  { id: 1, title: 'Post 1', body: 'Body 1', userId: 1 },
  { id: 2, title: 'Post 2', body: 'Body 2', userId: 2 },
  { id: 3, title: 'Post 3', body: 'Body 3', userId: 3 },
];

const postResource = new PostResource(posts);

const fullOutput = postResource.toJSON();
const filteredFields = postResource.toJSON(['id', 'title']);
const excludeFields = postResource.toJSON(['id', 'title'], true);

console.log('Full output', fullOutput);
console.log('Output selected fields', filteredFields);
console.log('Output excluding fields', excludeFields);
