import { IFieldValue } from "./IFieldValue"
export class FieldValue implements IFieldValue {
  constructor(field: string, value: string) {
    this.field = field;
    this.value = value;
  }
  field: string;
  value: string;
}