import { IModule } from "./IModule";
import { ComponentType } from "../Enums";
import { Component } from "../Component/Component";
export class Module implements IModule {
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
    this.childrens = new Array<Component>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  ddId: string;
  dtId: string;
  childrens: Array<Component>;
  childrensDataType: ComponentType;
}
