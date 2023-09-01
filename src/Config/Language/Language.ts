import { FieldValue } from "../Base/FieldValue/FieldValue";
import { ILanguage } from "./ILanguage";
export class Language implements ILanguage {
  constructor(
    guid: string,
    name: FieldValue<string>,
    level: FieldValue<string>
  ) {
    this.guid = guid;
    this.name = name;
    this.level = level;
  }
  setGuid(guid: string): void {
    this.guid = guid;
  }
  guid: string;
  name: FieldValue<string>;
  level: FieldValue<string>;
}
