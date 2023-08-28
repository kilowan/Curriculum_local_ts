import { IElement } from "../Base/Element/IElement";
import { ComponentType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface IExperience extends IElement {
  place?: FieldValue;
  initDate?: FieldValue;
  finishDate?: FieldValue;
  childrensTitle?: string;
  childrensDataType: ComponentType;
}
