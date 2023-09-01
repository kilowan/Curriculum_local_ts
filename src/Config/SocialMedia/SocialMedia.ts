import { Component } from "../Base/Component/Component";
import { SocialMediaType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { ISocialMedia } from "./ISocialMedia";
export class SocialMedia implements ISocialMedia {
  constructor(
    guid: string,
    name: FieldValue<string>,
    type: FieldValue<SocialMediaType>
  ) {
    this.guid = guid;
    this.name = name;
    this.type = type;
  }
  setGuid(guid: string): void {
    this.guid = guid;
  }
  guid: string;
  name: FieldValue<string>;
  type: FieldValue<SocialMediaType>;
}
