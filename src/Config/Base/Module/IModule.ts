import { IElement } from "../Element/IElement";
import { ComponentType } from "../Enums";
export interface IModule<T> extends IElement {
  name: string;
  childrensDataType: ComponentType;
  childrens: Array<T>;
}
