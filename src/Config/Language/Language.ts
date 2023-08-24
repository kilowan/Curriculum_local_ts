import { ILanguage } from "./ILanguage"
export class Language implements ILanguage {
  constructor(guid: string, name: string, level: string) {
    this.guid = guid;
    this.name = name;
    this.level = level;
  }
  guid: string;
  name: string;
  level: string;
}