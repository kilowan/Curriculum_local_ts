import { Component } from "../Base/Component/Component";
import { Module } from "../Base/Module/Module";
import { ICurriculumDetail } from "./ICurriculumDetail";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { Experience } from "../Experience/Experience";
import { Language } from "../Language/Language";
import { Training } from "../Training/Training";
export class CurriculumDetail implements ICurriculumDetail {
  constructor(
    guid: string,
    fullName: FieldValue,
    description: FieldValue,
    phoneNumber: FieldValue,
    email: FieldValue,
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
    this.socialMedia = new Array<Component>();
    this.otherData = modules[1];
  }

  guid: string;
  fullName: FieldValue;
  description: FieldValue;
  phoneNumber: FieldValue;
  email: FieldValue;
  experience: Module<Experience>;
  skillList: Module<Component>;
  academicTraining: Module<Training>;
  languageList: Module<Language>;
  socialMedia: Array<Component>;
  otherData: Module<Component>;
}
