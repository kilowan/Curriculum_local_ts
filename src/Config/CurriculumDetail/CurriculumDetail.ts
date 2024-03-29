import { Component } from "../Base/Component/Component";
import { Module } from "../Base/Module/Module";
import { ICurriculumDetail } from "./ICurriculumDetail";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { Experience } from "../Experience/Experience";
import { Language } from "../Language/Language";
import { Training } from "../Training/Training";
import { SocialMedia } from "../SocialMedia/SocialMedia";
import { Image } from "../Base/Image";
export class CurriculumDetail implements ICurriculumDetail {
  constructor(
    guid: string,
    fullName: FieldValue<string>,
    description: FieldValue<string>,
    phoneNumber: FieldValue<string>,
    email: FieldValue<string>,
    experience: Module<Experience>,
    language: Module<Language>,
    training: Module<Training>,
    modules: Array<Module<Component>>
  ) {
    this.guid = guid;
    this.fullName = fullName;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.experience = experience;
    this.skillList = modules[0];
    this.academicTraining = training;
    this.languageList = language;
    this.socialMedia = new Array<SocialMedia>();
    this.otherData = modules[1];
  }
  setGuid(guid: string): void {
    this.guid = guid;
  }
  import(input: CurriculumDetail): void {
    this.guid = input.guid;
    this.fullName = input.fullName;
    this.description = input.description;
    this.phoneNumber = input.phoneNumber;
    this.email = input.email;
    this.experience = input.experience;
    this.skillList = input.skillList;
    this.academicTraining = input.academicTraining;
    this.languageList = input.languageList;
    this.socialMedia = input.socialMedia;
    this.otherData = input.otherData;
    if(input.photo) this.photo = input.photo;
  }
  guid: string;
  fullName: FieldValue<string>;
  description: FieldValue<string>;
  phoneNumber: FieldValue<string>;
  email: FieldValue<string>;
  photo?: Image;
  experience: Module<Experience>;
  skillList: Module<Component>;
  academicTraining: Module<Training>;
  languageList: Module<Language>;
  socialMedia: Array<SocialMedia>;
  otherData: Module<Component>;
}
