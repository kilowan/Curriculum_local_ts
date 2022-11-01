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
/*interface IComponent {
  id: number;
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
  childrenIndex: number;
  addChildren(component: Component):void;
  removeChildren(id:number):void
  getChildrens(): Array<Component> | undefined;
  sort(): Array<Component> | undefined;
}

export class Component implements IComponent {
  id: number;
  name: string;
  place?: string | undefined;
  initDate?: string | undefined;
  finishDate?: string | undefined;
  graduationDate?: string | undefined;
  childrensTitle?: string | undefined;
  level?: string | undefined;
  type?: number | undefined;
  childrens?: Array<Component> | undefined;
  componentDataType?: string | undefined;
  childrenIndex: number;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    this.childrens = new Array<Component>();
    this.childrenIndex = id+1;
  }
  getChildrens(): any {
    return this.sort();
  }
  sort(){
    return this.childrens?.sort((a: any, b: any) => {
      return a.id - b.id;
    });
  }
  removeChildren(id: number): void {
    this.childrens = this.childrens?.filter((data: Component) =>{
      data.id !== id
    });
  }

  addChildren(component: Component): void {
    component.id = this.childrenIndex;
    this.childrenIndex++;
    this.childrens?.push(component);
    this.childrens = this.childrens?.sort((a: any, b: any) => {
      return a.id - b.id;
    });
  }
}*/
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
  Value = 11,
}
