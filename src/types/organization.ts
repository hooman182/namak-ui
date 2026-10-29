export type OrganizationDataType = {
  id: string;
  name: string;
  address?: string;
  description?: string;
};

export type OrganizationFormData = Omit<OrganizationDataType, 'id'>;
