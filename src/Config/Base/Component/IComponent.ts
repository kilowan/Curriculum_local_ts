import { IElement } from "../Element/IElement";
import { FieldValue } from "../FieldValue/FieldValue";
import { Component } from "./Component";
export interface IComponent extends IElement {
  name: FieldValue;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrens: Array<Component>;
  childrensTitle?: FieldValue;
  level?: string;
  type?: number;
}
