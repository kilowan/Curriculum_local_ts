import { IElement } from "../Base/Element/IElement";
import { ComponentType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface IExperience extends IElement {
  name: FieldValue<string>;
  place?: FieldValue<string>;
  initDate?: FieldValue<string>;
  finishDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  childrensDataType: ComponentType;
}
