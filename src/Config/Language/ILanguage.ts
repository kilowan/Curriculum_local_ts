import { IComponent } from "../Base/Component/IComponent";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface ILanguage extends IComponent {
  name: FieldValue<string>;
  level: FieldValue<string>;
}
