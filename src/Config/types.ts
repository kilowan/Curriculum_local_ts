export interface ICurriculumDetail {
  guid: string;
  fullName?: string;
  description: string;
  phoneNumber: string;
  email: string;
  experience: Array<Component>;
  skillList: Array<Component>;
  academicTraining: Array<Component>;
  languageList: Array<Component>;
  socialMedia: Array<Component>;
  otherData: Array<Component>;
}
export interface IComponent {
  guid: string;
  name: string;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrensTitle?: string;
  level?: string;
  type?: number;
  childrens?: Array<Component>;
  componentDataType?: string;
}
export class Component implements IComponent {
  constructor(guid: string, name: string) {
    this.guid = guid;
    this.name = name;
    this.childrens = new Array<Component>();
  }
  guid: string;
  name: string;
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrensTitle?: string;
  level?: string;
  type?: number;
  childrens?: Array<Component>;
  componentDataType?: string;
}
export class CurriculumDetail implements ICurriculumDetail {
  constructor(
    guid: string,
    fullName: string,
    description: string,
    phoneNumber: string,
    email: string
  ) {
    this.guid = guid;
    this.fullName = fullName;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.experience = new Array<Component>();
    this.skillList = new Array<Component>();
    this.academicTraining = new Array<Component>();
    this.languageList = new Array<Component>();
    this.socialMedia = new Array<Component>();
    this.otherData = new Array<Component>();
  }

  guid: string;
  fullName: string;
  description: string;
  phoneNumber: string;
  email: string;
  experience: Array<Component>;
  skillList: Array<Component>;
  academicTraining: Array<Component>;
  languageList: Array<Component>;
  socialMedia: Array<Component>;
  otherData: Array<Component>;
}
export enum SocialMediaType {
  Linkedin = 1,
  Infojobs = 2,
  GitHub = 3,
}
export enum ComponentType {
  Experience = 1,
  Academic = 2,
  Skills = 3,
  Languages = 4,
  Other = 5,
  Content = 6,
  SubContent = 7,
  Contract = 8,
  Project = 9,
  Description = 10,
  Value = 11,
}
