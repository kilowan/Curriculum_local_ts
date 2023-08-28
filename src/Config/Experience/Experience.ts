import { FieldValue } from "../Base/FieldValue/FieldValue";
import { IExperience } from "./IExperience";
import { Component } from "../Base/Component/Component";
import { ComponentType } from "../Base/Enums";
export class Experience implements IExperience {
  constructor(guid: string, name: string, childrensDataType: ComponentType) {
    this.guid = guid;
    this.name = name;
    this.childrensDataType = childrensDataType;
    this.childrens = new Array<Component>();
  }
  guid: string;
  name: string;
  place?: FieldValue;
  initDate?: FieldValue;
  finishDate?: FieldValue;
  childrensTitle?: string;
  childrensDataType: ComponentType;
  childrens: Array<Component>;
}
