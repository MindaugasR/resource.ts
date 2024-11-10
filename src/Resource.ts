export default class Resource<T = any, R = any> {
  protected data: T | T[];

  constructor(data: T | T[]) {
    this.data = data;
  }

  toJSON(): R[] | R {
    if (Array.isArray(this.data) && this.data.length === 0) return [] as R[];
    if (
      !this.data ||
      typeof this.data !== 'object' ||
      (typeof this.data === 'object' && Object.keys(this.data).length === 0)
    )
      return {} as R;

    if (Array.isArray(this.data)) {
      return this.data.map((item) => this.format(item)) as R[];
    } else {
      return this.format(this.data as T) as R;
    }
  }

  protected format(item: T): R {
    throw new Error('format method must be implemented in the subclass');
  }
}
