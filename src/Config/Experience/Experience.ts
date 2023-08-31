import { FieldValue } from "../Base/FieldValue/FieldValue";
import { IExperience } from "./IExperience";
import { Component } from "../Base/Component/Component";
import { ComponentType } from "../Base/Enums";
export class Experience implements IExperience {
  constructor(
    guid: string,
    name: FieldValue,
    childrensDataType: ComponentType
  ) {
    this.guid = guid;
    this.name = name;
    this.childrensDataType = childrensDataType;
    this.childrens = new Array<Component>();
  }
  guid: string;
  name: FieldValue;
  place?: FieldValue;
  initDate?: FieldValue;
  finishDate?: FieldValue;
  childrensTitle?: FieldValue;
  childrensDataType: ComponentType;
  childrens: Array<Component>;
}
