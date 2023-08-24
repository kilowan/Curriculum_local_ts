import { IExperienceModule } from "./IExperienceModule"
import { ComponentType } from "../../Base/Enums"
import { Experience } from "../Experience"
export class ExperienceModule implements IExperienceModule {
  constructor(guid: string, ddId: string, dtId: string, childrensDataType: ComponentType, name: string) {
    this.guid = guid;
    this.name = name;
    this.ddId = ddId;
    this.dtId = dtId;
    this.childrens = new Array<Experience>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  ddId: string;
  dtId: string;
  childrens: Array<Experience>;
  childrensDataType: ComponentType;
}