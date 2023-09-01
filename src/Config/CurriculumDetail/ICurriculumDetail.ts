import { IElement } from "../Base/Element/IElement";
import { Module } from "../Base/Module/Module";
import { Component } from "../Base/Component/Component";
import { FieldValue } from "../Base/FieldValue/FieldValue";
import { Experience } from "../Experience/Experience";
import { Training } from "../Training/Training";
import { Language } from "../Language/Language";
import { SocialMedia } from "../SocialMedia/SocialMedia";
export interface ICurriculumDetail extends IElement {
  fullName?: FieldValue<string>;
  description: FieldValue<string>;
  phoneNumber: FieldValue<string>;
  email: FieldValue<string>;
  experience: Module<Experience>;
  skillList: Module<Component>;
  academicTraining: Module<Training>;
  languageList: Module<Language>;
  socialMedia: Array<SocialMedia>;
  otherData: Module<Component>;
}
