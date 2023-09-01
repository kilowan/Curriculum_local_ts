import { IElement } from "../Element/IElement";
import { SocialMediaType } from "../Enums";
import { FieldValue } from "../FieldValue/FieldValue";
import { Component } from "./Component";
export interface IComponent extends IElement {
  name: FieldValue<string>;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrens: Array<Component>;
  childrensTitle?: FieldValue<string>;
  level?: string;
  type?: FieldValue<number>;
}
