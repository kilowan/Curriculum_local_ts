import { IOption } from "./IOption";

export class Option implements IOption {
  constructor(value: number, text: string, disabled: boolean) {
    this.value = value;
    this.text = text;
    this.disabled = disabled;
  }
  value: number;
  text: string;
  disabled: boolean;
}
