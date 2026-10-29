import type { LetterDataType, LetterFormData } from 'src/types/letter';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useData } from 'src/contexts/data-context';

// ----------------------------------------------------------------------

export function useLetterMutation() {
  const queryClient = useQueryClient();
  const { addLetter, updateLetter } = useData();

  const create = useMutation({
    mutationKey: ['letter', 'create'],
    mutationFn: async (data: LetterDataType) => addLetter(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letter'] });
    },
  });

  const update = useMutation({
    mutationKey: ['letter', 'update'],
    mutationFn: async ({ id, ...data }: LetterDataType & LetterFormData) =>
      updateLetter(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['letter'] });
    },
  });

  return { create, update };
}
