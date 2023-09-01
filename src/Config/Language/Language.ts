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
  guid: string;
  name: FieldValue<string>;
  level: FieldValue<string>;
}
