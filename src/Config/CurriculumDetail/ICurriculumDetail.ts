import { ExperienceModule } from "../Experience/Module/ExperienceModule";
import { IElement } from "../Base/Element/IElement";
import { Module } from "../Base/Module/Module";
import { Component } from "../Base/Component/Component";
import { LanguageModule } from "../Language/Module/LanguageModule";
import { TrainingModule } from "../Training/Module/TrainingModule";
import { FieldValue } from "../Base/FieldValue/FieldValue";
export interface ICurriculumDetail extends IElement {
  fullName?: FieldValue;
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
