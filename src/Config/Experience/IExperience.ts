import { IComponent } from "../Base/Component/IComponent";
import { ComponentType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface IExperience extends IComponent {
  name: FieldValue<string>;
  place?: FieldValue<string>;
  initDate?: FieldValue<string>;
  finishDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  childrensDataType: ComponentType;
}
