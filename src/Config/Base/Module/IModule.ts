import { Component } from "../Component/Component";
import { IElement } from "../Element/IElement"
import { ComponentType } from "../Enums"
export interface IModule extends IElement {
  name: string;
  childrensDataType: ComponentType;
  childrens: Array<Component>;
}