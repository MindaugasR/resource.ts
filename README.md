# Resource Library

The Resource Library is a TypeScript utility that helps developers easily manage the transformation of data objects. It provides a customizable and flexible `Resource` class, allowing developers to define how data should be formatted before being sent to the client. This is similar to Laravel’s resource handling.

## Installation

To install the Resource Library, use npm:

```bash
npm install resource.ts
```

or with Yarn:

```bash
yarn add resource.ts
```

## Usage

### Overview

The `Resource` class is designed to be extended in order to define specific data formats for different types of resources. When you create a subclass of `Resource`, you override the `format` method to specify how each item should be transformed. You can also use powerful filtering options, such as `include` and `exclude`, to dynamically manage which fields appear in the final JSON output.

### Creating a Custom Resource

Let's go through the steps to create a custom resource. Suppose you have a `Post` type with several fields:

```typescript
interface Post {
  id: number;
  title: string;
  author: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}
```

Define a `PostResource` class extending `Resource`:

```typescript
import { Resource } from 'resource-library';

interface ReturnPost {
  id: number;
  title: string;
  author: string;
  content: string;
}

class PostResource extends Resource<Post, ReturnPost> {
  protected format(item: Post): ReturnPost {
    return {
      id: item.id,
      title: item.title,
      author: item.author,
      content: item.content,
    };
  }
}
```

### Using `toJSON` with Filtering

You can call the `toJSON` method on the `PostResource` instance to output a JSON-friendly version of the data. You can use `include` or `exclude` to control which fields are included or excluded in the output.

```typescript
const posts: Post[] = [
  {
    id: 1,
    title: 'First Post',
    author: 'John',
    content: 'This is the first post',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 2,
    title: 'Second Post',
    author: 'Jane',
    content: 'This is the second post',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
];

const postResource = new PostResource(posts);
const output = postResource.toJSON(['id', 'title']);
console.log(output);
```

### API Reference

#### `new Resource(data)`

Creates a new instance of the `Resource` class with the provided data. This data can be either a single object or an array of objects.

- `data: T | T[]` — The data to be transformed by the resource.

#### `toJSON(fields?: string[], exclude?: boolean)`

Converts the resource's data to a JSON-compatible format, optionally including or excluding specified fields.

- `fields: string[]` (optional) — An array of field names to include or exclude in the output.
- `exclude: boolean` (optional) — If `true`, treat `fields` as fields to exclude instead.

### Example Usage with Filtering

In the example below, we’ll use both `include` and `exclude` options to control which fields appear in the final output:

```typescript
// Exclude specific fields
const outputExclude = postResource.toJSON(['createdAt', 'updatedAt'], true);
console.log(outputExclude);

// Include specific fields only
const outputInclude = postResource.toJSON(['id', 'author']);
console.log(outputInclude);
```

## License

This project is licensed under the MIT License.
