import type { Organization, OrganizationFormData } from 'src/types/organization';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useData } from 'src/contexts/data-context';

// ----------------------------------------------------------------------

export function useOrganizationMutation() {
  const queryClient = useQueryClient();
  const { addOrganization, updateOrganization } = useData();

  const create = useMutation({
    mutationKey: ['organization', 'create'],
    mutationFn: async (data: OrganizationFormData) => addOrganization(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });

  const update = useMutation({
    mutationKey: ['organization', 'update'],
    mutationFn: async ({ id, ...data }: Organization & OrganizationFormData) =>
      updateOrganization(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organizations'] });
    },
  });

  return { create, update };
}
