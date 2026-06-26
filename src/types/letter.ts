export type LetterDirection = 'incoming' | 'outgoing';

export type LetterAttachment = {
  id: string;
  name: string;
  mimeType: string;
  size: number;
  previewUrl: string;
};

export type Letter = {
  id: string;
  subject: string;
  letterNumber: string;
  direction: LetterDirection;
  organizationId: string;
  letterDate: string;
  description?: string;
  attachments: LetterAttachment[];
  createdAt: string;
};

export type LetterFormData = Omit<Letter, 'id' | 'createdAt'>;

export const LETTER_DIRECTION_LABELS: Record<LetterDirection, string> = {
  incoming: 'وارده',
  outgoing: 'صادره',
};
