export type Organization = {
  id: string;
  name: string;
  code?: string;
  contactPerson?: string;
  phone?: string;
};

export type OrganizationFormData = Omit<Organization, 'id'>;
