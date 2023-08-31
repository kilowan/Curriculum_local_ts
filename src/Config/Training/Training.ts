import { ITraining } from "./ITraining";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { Component } from "../Base/Component/Component";
import { ComponentType } from "../Base/Enums";
export class Training implements ITraining {
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
  graduationDate?: FieldValue;
  childrensTitle?: FieldValue;
  childrens?: Array<Component>;
  childrensDataType: ComponentType;
}
