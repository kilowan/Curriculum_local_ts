import { FieldValue } from "../Base/FieldValue/FieldValue";
import { IElement } from "../Base/Element/IElement";
import { ComponentType } from "../Base/Enums";
export interface ITraining extends IElement {
  name: string;
  place?: FieldValue;
  graduationDate?: FieldValue;
  childrensTitle?: string;
  childrensDataType: ComponentType;
}
