import { IElement } from "../Base/Element/IElement";
import { SocialMediaType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface ISocialMedia extends IElement {
  name: FieldValue<string>;
  type: FieldValue<SocialMediaType>;
}
