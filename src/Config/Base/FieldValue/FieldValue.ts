import { IFieldValue } from "./IFieldValue";
export class FieldValue<T> implements IFieldValue<T> {
  constructor(value: T, field?: string) {
    this.field = field;
    this.value = value;
  }
  field?: string;
  value: T;
}
