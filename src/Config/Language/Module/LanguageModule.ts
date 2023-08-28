import { ILanguageModule } from "./ILanguageModule";
import { ComponentType } from "../../Base/Enums";
import { Language } from "../Language";
export class LanguageModule implements ILanguageModule {
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
    this.childrens = new Array<Language>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  ddId: string;
  dtId: string;
  childrens: Array<Language>;
  childrensDataType: ComponentType;
}
