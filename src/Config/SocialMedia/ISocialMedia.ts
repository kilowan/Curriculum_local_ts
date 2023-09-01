import { IComponent } from "../Base/Component/IComponent";
import { IElement } from "../Base/Element/IElement";
import { SocialMediaType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface ISocialMedia extends IComponent {
  name: FieldValue<string>;
  type: FieldValue<SocialMediaType>;
}
