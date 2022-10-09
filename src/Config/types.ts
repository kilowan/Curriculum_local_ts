export interface base {
  id: number;
}
export interface CurriculumDetail {
    fullName: string;
    description: string;
    phoneNumber: string;
    email: string;
    experience: Array<Experience>;
    otherTraining: Array<Training>;
    academicTraining: Array<Training>;
    languageList: Array<Language>;
    socialMedia: Array<SocialMedia>;
    otherData: Array<OtherData>;
  }
  export interface Experience extends base {
    name: string;
    type: number;
    place: string;
    initDate?: string;
    finishDate?: string;
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
    type: number;
    place: string;
    initDate?: string;
    finishDate?: string;
    graduationDate?: string;
    contents: Contents;
  }
  export interface Content extends base {
    name: string;
    edit: boolean;
    subContents: SubContents;
  }
  export interface Contents extends base {
    contents: Array<Content>
  }
  export interface SubContents extends base {
    subContents: Array<SubContent>
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
    type: MediaType;
  }
  export interface MediaType extends base {
    name: string;
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
    professional = 2
  }
  export enum TrainingType {
    academic = 1,
    other = 2
  }