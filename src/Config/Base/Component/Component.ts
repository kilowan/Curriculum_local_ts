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

  setGuid(guid: string): void {
    this.guid = guid;
  }
  guid: string;
  name: FieldValue<string>;
  place?: FieldValue<string>;
  initDate?: FieldValue<string>;
  finishDate?: FieldValue<string>;
  graduationDate?: FieldValue<string>;
  childrensTitle?: FieldValue<string>;
  level?: FieldValue<string>;
  type?: FieldValue<SocialMediaType>;
  childrens?: Array<Component>;
  childrensDataType?: ComponentType;
}
