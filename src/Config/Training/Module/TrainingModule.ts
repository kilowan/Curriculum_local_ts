import { ITrainingModule } from "./ITrainingModule"
import { ComponentType } from "../../Base/Enums"
import { Training } from "../Training"
export class TrainingModule implements ITrainingModule {
  constructor(guid: string, ddId: string, dtId: string, childrensDataType: ComponentType, name: string) {
    this.guid = guid;
    this.name = name;
    this.ddId = ddId;
    this.dtId = dtId;
    this.childrens = new Array<Training>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  ddId: string;
  dtId: string;
  childrens: Array<Training>;
  childrensDataType: ComponentType;
}