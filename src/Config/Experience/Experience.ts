import { FieldValue } from "../Base/FieldValue/FieldValue";
import { IExperience } from "./IExperience";
import { Component } from "../Base/Component/Component";
import { ComponentType } from "../Base/Enums";
export class Experience implements IExperience {
  constructor(
    guid: string,
    name: FieldValue<string>,
    childrensDataType: ComponentType
  ) {
    this.guid = guid;
    this.name = name;
    this.childrensDataType = childrensDataType;
    this.childrens = new Array<Component>();
  }
  setGuid(guid: string): void {
    this.guid = guid;
  }
  guid: string;
  name: FieldValue<string>;
  place?: FieldValue<string>;
  initDate?: FieldValue<string>;
  finishDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  childrensDataType: ComponentType;
  childrens: Array<Component>;
}
