export default class Resource<T = any, R = any> {
  protected data: T | T[] | undefined;

  constructor(data?: T | T[]) {
    this.data = data;
  }

  toJSON(fields: string[] = [], exclude: boolean = false): R[] | R {
    if (Array.isArray(this.data) && this.data.length === 0) return [] as R[];
    if (
      !this.data ||
      typeof this.data !== 'object' ||
      (typeof this.data === 'object' && Object.keys(this.data).length === 0)
    )
      return {} as R;

    if (Array.isArray(this.data)) {
      return this.data.map((item) =>
        this.filterFields(this.format(item), fields, exclude)
      ) as R[];
    } else {
      return this.filterFields(
        this.format(this.data as T),
        fields,
        exclude
      ) as R;
    }
  }

  protected format(item: T): R {
    throw new Error('format method must be implemented in the subclass');
  }

  private filterFields(item: R, fields: string[], exclude: boolean): R {
    if (!fields.length) return item;

    let filteredItem: any = { ...item };

    if (exclude) {
      fields.forEach((field) => {
        if (field in filteredItem) {
          delete filteredItem[field];
        }
      });
    } else {
      filteredItem = Object.keys(filteredItem).reduce(
        (acc: any, key: string) => {
          if (fields.includes(key)) {
            acc[key] = filteredItem[key];
          }
          return acc;
        },
        {}
      );
    }

    return filteredItem;
  }
}
