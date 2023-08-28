import { ComponentType } from "../../Base/Enums";
import { IElement } from "../../Base/Element/IElement";
import { Language } from "../Language";
export interface ILanguageModule extends IElement {
  name: string;
  childrens: Array<Language>;
  childrensDataType: ComponentType;
}
