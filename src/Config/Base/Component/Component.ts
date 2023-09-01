import { IComponent } from "./IComponent";
import { ComponentType, SocialMediaType } from "../Enums";
import { FieldValue } from "../FieldValue/FieldValue";
export class Component implements IComponent {
  constructor(
    guid: string,
    childrensDataType: ComponentType,
    name: FieldValue<string>
  ) {
    this.guid = guid;
    this.name = name;
    this.childrens = new Array<Component>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: FieldValue<string>;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrensTitle?: FieldValue<string>;
  level?: string;
  type?: FieldValue<number>;
  childrens: Array<Component>;
  childrensDataType: ComponentType;
}
