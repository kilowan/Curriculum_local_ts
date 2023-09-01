import { IComponent } from "./IComponent";
import { ComponentType } from "../Enums";
import { FieldValue } from "../FieldValue/FieldValue";
export class Component implements IComponent {
  constructor(
    guid: string,
    childrensDataType: ComponentType,
    name: FieldValue
  ) {
    this.guid = guid;
    this.name = name;
    this.childrens = new Array<Component>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: FieldValue;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrensTitle?: FieldValue;
  level?: string;
  type?: number;
  childrens: Array<Component>;
  childrensDataType: ComponentType;
}
