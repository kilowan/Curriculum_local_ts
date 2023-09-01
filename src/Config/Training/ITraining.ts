import { FieldValue } from "../Base/FieldValue/FieldValue";
import { IElement } from "../Base/Element/IElement";
import { ComponentType } from "../Base/Enums";
export interface ITraining extends IElement {
  name: FieldValue<string>;
  place?: FieldValue<string>;
  graduationDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  childrensDataType: ComponentType;
}
