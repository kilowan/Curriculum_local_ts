export interface IElement {
  guid: string;
}
export interface IModule extends IElement {
  name: string;
  childrens: Array<Component>;
  childrensDataType: ComponentType;
}
export class Module implements IModule {
  constructor(guid: string, ddId: string, dtId: string, childrensDataType: ComponentType, name: string) {
    this.guid = guid;
    this.name = name;
    this.ddId = ddId;
    this.dtId = dtId;
    this.childrens = new Array<Component>();
    this.childrensDataType = childrensDataType;
  }
  guid: string;
  name: string;
  ddId: string;
  dtId: string;
  childrens: Array<Component>;
  childrensDataType: ComponentType;
}
export interface IComponent extends IModule{
  place?: string;
  initDate?: string;
  finishDate?: string;
  graduationDate?: string;
  childrensTitle?: string;
  level?: string;
  type?: number;
}
export class Component implements IComponent {
  constructor(guid: string, childrensDataType: ComponentType, name: string) {
    this.guid = guid;
    this.name = name;
    this.childrens = new Array<Component>();
    this.childrensDataType = childrensDataType;
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
  childrens: Array<Component>;
  childrensDataType: ComponentType;
  componentDataType?: string;
}
export interface ICurriculumDetail extends IElement {
  fullName?: string;
  description: string;
  phoneNumber: string;
  email: string;
  experience: Module;
  skillList: Module;
  academicTraining: Module;
  languageList: Module;
  socialMedia: Array<Component>;
  otherData: Module;
}
export class CurriculumDetail implements ICurriculumDetail {
  constructor(
    guid: string,
    fullName: string,
    description: string,
    phoneNumber: string,
    email: string,
    modules: Array<Module>
  ) {
    this.guid = guid;
    this.fullName = fullName;
    this.description = description;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.experience = modules[0];
    this.skillList = modules[1];
    this.academicTraining = modules[2];
    this.languageList = modules[3];
    this.socialMedia = new Array<Component>();
    this.otherData = modules[4];
  }

  guid: string;
  fullName: string;
  description: string;
  phoneNumber: string;
  email: string;
  experience: Module;
  skillList: Module;
  academicTraining: Module;
  languageList: Module;
  socialMedia: Array<Component>;
  otherData: Module;
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
  End = 12,
}
