import { ComponentType } from "../../Base/Enums";
import { IElement } from "../../Base/Element/IElement";
import { Training } from "../Training";
export interface ITrainingModule extends IElement {
  name: string;
  childrens: Array<Training>;
  childrensDataType: ComponentType;
}
