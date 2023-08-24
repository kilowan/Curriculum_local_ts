import { IComponent } from "./IComponent"
import { ComponentType } from "../Enums"
export class Component implements IComponent {
  constructor(guid: string, childrensDataType: ComponentType, name: string) {
    this.guid = guid;
    this.name = name;
    this.childrens = new Array<Component>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrensTitle?: string;
  level?: string;
  type?: number;
  childrens: Array<Component>;
  childrensDataType: ComponentType;
  componentDataType?: string;
}