import { IElement } from "../Element/IElement";
import { Component } from "./Component";
export interface IComponent extends IElement {
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrens: Array<Component>;
  childrensTitle?: string;
  level?: string;
  type?: number;
}
