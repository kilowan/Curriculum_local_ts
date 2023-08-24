import { Component } from "../Base/Component/Component"
import { Module } from "../Base/Module/Module"
import { ICurriculumDetail } from "./ICurriculumDetail"
import { ExperienceModule } from "../Experience/Module/ExperienceModule"
import { LanguageModule } from "../Language/Module/LanguageModule";
import { TrainingModule } from "../Training/Module/TrainingModule";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export class CurriculumDetail implements ICurriculumDetail {
  constructor(
    guid: string,
    fullName: FieldValue,
    description: FieldValue,
    phoneNumber: FieldValue,
    email: FieldValue,
    experience: ExperienceModule,
    language: LanguageModule,
    training: TrainingModule,
    modules: Array<Module>
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
    this.socialMedia = new Array<Component>();
    this.otherData = modules[1];
  }

  guid: string;
  fullName: FieldValue;
  description: FieldValue;
  phoneNumber: FieldValue;
  email: FieldValue;
  experience: ExperienceModule;
  skillList: Module;
  academicTraining: TrainingModule;
  languageList: LanguageModule;
  socialMedia: Array<Component>;
  otherData: Module;
}