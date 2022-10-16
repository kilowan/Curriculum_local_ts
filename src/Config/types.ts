export interface base {
  id: number;
}
export interface CurriculumDetail extends base {
  fullName: string;
  description: string;
  phoneNumber: string;
  email: string;
  experience: Array<Experience>;
  otherTraining: Array<Training>;
  academicTraining: Array<Academic>;
  languageList: Array<Language>;
  socialMedia: Array<SocialMedia>;
  otherData: Array<OtherData>;
}
export interface Experience extends base {
  name: string;
  type: number;
  place: string;
  initDate: string;
  finishDate: string;
  contracts: Array<Contract>;
}
export interface Contract extends base {
  name: string;
  projects: Array<Project>;
}
export interface Project extends base {
  name: string;
  descriptionList: Array<Description>;
}
export interface Description extends base {
  name: string;
}
export interface Training extends base {
  name: string;
  contents: Array<Content>;
}
export interface Academic extends Training {
  place: string;
  initDate?: string;
  finishDate?: string;
  graduationDate: string;
}
export interface Content extends base {
  name: string;
  subContents: Array<SubContent>;
}
export interface SubContent extends base {
  name: string;
}
export interface Language extends base {
  name: string;
  level: string;
}
export interface SocialMedia extends base {
  name: string;
  type: number;
}
export interface OtherData extends base {
  name: string;
  values: Array<Value>;
}
export interface Value extends base {
  name: string;
}
export enum ContentType {
  Academic,
  Complementary,
}
export enum SocialMediaType {
  Linkedin = 1,
  Infojobs = 2,
  GitHub = 3,
}
export enum ExperienceType {
  personal = 1,
  professional = 2,
}
export enum TrainingType {
  academic = 1,
  other = 2,
}
