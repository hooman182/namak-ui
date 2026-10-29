import type { OrganizationDataType } from 'src/types/organization';
import type { LetterDataType, LetterFormData } from 'src/types/letter';

import * as z from 'zod';

const LetterAttachmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  mimeType: z.string(),
  size: z.number(),
  previewUrl: z.string(),
});

export const LetterFormschema = z.object({
  title: z.string().min(1, 'موضوع نامه الزامی است'),

  letterNumber: z.string().min(1, 'شماره نامه الزامی است'),

  letterType: z.enum(['incoming', 'outgoing'], {
    message: 'نوع نامه را انتخاب کنید',
  }),

  letterDate: z.string().min(1, 'تاریخ نامه الزامی است'),

  organization: z
    .object({
      id: z.string(),
      name: z.string(),
      address: z.string().optional(),
      description: z.string().optional(),
    })
    .nullable(),

  term: z.string(),

  attachments: z.array(LetterAttachmentSchema),
});

export type LetterFormValues = z.infer<typeof LetterFormschema>;

export function formValuesToLetterData(values: LetterFormValues): LetterFormData {
  return {
    subject: values.title,
    letterNumber: values.letterNumber,
    direction: values.letterType,
    organizationId: values.organization?.id ?? '',
    letterDate: values.letterDate,
    description: values.term || undefined,
    attachments: values.attachments,
  };
}

export function letterDataToFormValues(
  letter: LetterDataType,
  organization?: OrganizationDataType | null
): Partial<LetterFormValues> {
  return {
    title: letter.subject,
    letterNumber: letter.letterNumber,
    letterType: letter.direction,
    letterDate: letter.letterDate,
    organization:
      organization ??
      (letter.organizationId ? { id: letter.organizationId, name: '' } : null),
    term: letter.description ?? '',
    attachments: letter.attachments,
  };
}
