import { ITraining } from "./ITraining";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { Component } from "../Base/Component/Component";
import { ComponentType } from "../Base/Enums";
export class Training implements ITraining {
  constructor(guid: string, name: string, childrensDataType: ComponentType) {
    this.guid = guid;
    this.name = name;
    this.childrensDataType = childrensDataType;
    this.childrens = new Array<Component>();
  }
  guid: string;
  name: string;
  place?: FieldValue;
  graduationDate?: FieldValue;
  childrensTitle?: string;
  childrens?: Array<Component>;
  childrensDataType: ComponentType;
}
