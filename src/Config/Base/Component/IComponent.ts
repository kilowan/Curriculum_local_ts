import { IElement } from "../Element/IElement";
import { ComponentType, SocialMediaType } from "../Enums";
import { FieldValue } from "../FieldValue/FieldValue";
import { Component } from "./Component";
export interface IComponent extends IElement {
  name: FieldValue<string>;
  place?: FieldValue<string>;
  initDate?: FieldValue<string>;
  finishDate?: FieldValue<string>;
  graduationDate?: FieldValue<string>;
  childrens?: Array<Component>;
  childrensTitle?: FieldValue<string>;
  childrensDataType?: ComponentType;
  level?: FieldValue<string>;
  type?: FieldValue<SocialMediaType>;
}
