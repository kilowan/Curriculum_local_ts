import { IElement } from "../Base/Element/IElement";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface ILanguage extends IElement {
  name: string;
  level: FieldValue;
}