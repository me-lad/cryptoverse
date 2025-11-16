import { FormFieldNames, FormFieldKinds, FormKinds } from '~constants/form';

export type FormKindsT = (typeof FormKinds)[keyof typeof FormKinds];

export type FormFieldKindsT =
  (typeof FormFieldKinds)[keyof typeof FormFieldKinds];

export type FormFieldNamesT =
  (typeof FormFieldNames)[keyof typeof FormFieldNames];

export interface FormFieldT {
  id: number;
  name: FormFieldNamesT;
  type: FormFieldKindsT;
  placeholder: string;
}
