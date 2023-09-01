import { FieldValue } from "../Base/FieldValue/FieldValue";
import { ComponentType } from "../Base/Enums";
import { IComponent } from "../Base/Component/IComponent";
export interface ITraining extends IComponent {
  name: FieldValue<string>;
  place?: FieldValue<string>;
  graduationDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  childrensDataType: ComponentType;
}
