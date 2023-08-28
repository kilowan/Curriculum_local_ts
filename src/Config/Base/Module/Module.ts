import { IModule } from "./IModule";
import { ComponentType } from "../Enums";
export class Module<T> implements IModule<T> {
  constructor(
    guid: string,
    ddId: string,
    dtId: string,
    childrensDataType: ComponentType,
    name: string
  ) {
    this.guid = guid;
    this.name = name;
    this.ddId = ddId;
    this.dtId = dtId;
    this.childrens = new Array<T>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  ddId: string;
  dtId: string;
  childrens: Array<T>;
  childrensDataType: ComponentType;
}
