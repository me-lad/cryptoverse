export interface AccountManagementFormData {
  identifier?: string;
  username?: string;
  fullName?: string;
  email?: string;
}

export interface AccountManagementFormState {
  status: 'Success' | 'Error';
  message: string;
}
