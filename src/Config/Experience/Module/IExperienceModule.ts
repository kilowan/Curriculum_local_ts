import { ComponentType } from "../../Base/Enums";
import { IElement } from "../../Base/Element/IElement";
import { Experience } from "../Experience";
export interface IExperienceModule extends IElement {
  name: string;
  childrens: Array<Experience>;
  childrensDataType: ComponentType;
}
