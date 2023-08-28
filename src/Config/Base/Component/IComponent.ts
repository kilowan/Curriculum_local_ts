import { IModule } from "../Module/IModule";
import { Component } from "./Component";
export interface IComponent extends IModule {
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrens: Array<Component>;
  childrensTitle?: string;
  level?: string;
  type?: number;
}
