export interface CurriculumDetail {
  id: number;
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
export interface Component {
  id: number;
  identifier?: string;
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
export enum SocialMediaType {
  Linkedin = 1,
  Infojobs = 2,
  GitHub = 3,
}
export enum ComponentType {
  Experience = 1,
  Academic = 2,
  Skill = 3,
  Languages = 4,
  Other = 5,
  Content = 6,
  SubContent = 7,
  Contract = 8,
  Project = 9,
  Description = 10,
  Value = 11
}
