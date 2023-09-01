import { IFieldValue } from "./IFieldValue";
export class FieldValue implements IFieldValue {
  constructor(value: string, field?: string) {
    this.field = field;
    this.value = value;
  }
  field?: string;
  value: string;
}
