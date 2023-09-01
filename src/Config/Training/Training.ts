import { ITraining } from "./ITraining";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { Component } from "../Base/Component/Component";
import { ComponentType } from "../Base/Enums";
export class Training implements ITraining {
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
  graduationDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  childrens?: Array<Component>;
  childrensDataType: ComponentType;
}
