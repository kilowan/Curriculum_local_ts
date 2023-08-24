import { ComponentType } from "../Base/Enums";
import { FieldValue } from "../Base/FieldValue/FieldValue"
import { IModule } from "../Base/Module/IModule"
export interface IExperience extends IModule {
  place?: FieldValue;
  initDate?: FieldValue;
  finishDate?: FieldValue;
  childrensTitle?: string;
  childrensDataType: ComponentType;
}