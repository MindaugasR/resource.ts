export declare class Resource<T, R> {
  protected data: T | T[];

  constructor(data: T | T[]);

  toJSON(): R | R[];

  protected format(item: T): R;
}
