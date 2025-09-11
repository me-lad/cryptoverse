import { FormFieldNames, FormFieldTypes, FormTypes } from "~constants/forms";

export type FormTypesType = (typeof FormTypes)[keyof typeof FormTypes];

export type FormFieldTypesType = (typeof FormFieldTypes)[keyof typeof FormFieldTypes];

export type FormFieldNamesType = (typeof FormFieldNames)[keyof typeof FormFieldNames];

export interface FormFieldType {
  id: number;
  name: FormFieldNamesType;
  type: FormFieldTypesType;
  placeholder: string;
}
