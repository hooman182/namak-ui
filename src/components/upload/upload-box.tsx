import type { LetterAttachment } from 'src/types/letter';

import { useRef, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';

import {
  isImageMime,
  formatFileSize,
  isAcceptedFile,
  isValidFileSize,
  ACCEPTED_EXTENSIONS,
} from './file-utils';

// ----------------------------------------------------------------------

type UploadBoxProps = {
  value: LetterAttachment[];
  onChange: (attachments: LetterAttachment[]) => void;
  error?: string;
};

export function UploadBox({ value, onChange, error }: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef(value);

  useEffect(() => {
    valueRef.current = value;
  }, [value]);

  useEffect(
    () => () => {
      valueRef.current.forEach((item) => {
        if (item.previewUrl.startsWith('blob:')) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    },
    []
  );

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files?.length) return;

      const newAttachments: LetterAttachment[] = [];
      const errors: string[] = [];

      Array.from(files).forEach((file) => {
        if (!isAcceptedFile(file)) {
          errors.push(`فرمت فایل «${file.name}» پشتیبانی نمی‌شود`);
          return;
        }
        if (!isValidFileSize(file)) {
          errors.push(`حجم فایل «${file.name}» بیش از حد مجاز است`);
          return;
        }
        newAttachments.push({
          id: `file-${Date.now()}-${Math.random().toString(36).slice(2)}`,
          name: file.name,
          mimeType: file.type,
          size: file.size,
          previewUrl: URL.createObjectURL(file),
        });
      });

      if (newAttachments.length) {
        onChange([...value, ...newAttachments]);
      }

      if (errors.length && inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onChange, value]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const removed = value.find((item) => item.id === id);
      if (removed?.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(removed.previewUrl);
      }
      onChange(value.filter((item) => item.id !== id));
    },
    [onChange, value]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      handleFiles(event.dataTransfer.files);
    },
    [handleFiles]
  );

  return (
    <Box>
      <Box
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}
        sx={{
          p: 3,
          borderRadius: 1.5,
          textAlign: 'center',
          border: (theme) => `dashed 1px ${theme.vars.palette.divider}`,
          bgcolor: (theme) => theme.vars.palette.background.neutral,
          ...(error && {
            borderColor: 'error.main',
          }),
        }}
      >
        <Iconify icon="mingcute:add-line" width={48} sx={{ mb: 1, color: 'text.disabled' }} />
        <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
          فایل را اینجا رها کنید یا
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => inputRef.current?.click()}
        >
          انتخاب فایل
        </Button>
        <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.disabled' }}>
          PDF، JPG، PNG — حداکثر ۱۰ مگابایت
        </Typography>
        <input
          ref={inputRef}
          type="file"
          hidden
          multiple
          accept={ACCEPTED_EXTENSIONS}
          onChange={(event) => handleFiles(event.target.files)}
        />
      </Box>

      {error && (
        <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}

      {!!value.length && (
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {value.map((file) => (
            <Box
              key={file.id}
              sx={{
                p: 1.5,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                borderRadius: 1,
                border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
              }}
            >
              {isImageMime(file.mimeType) && file.previewUrl ? (
                <Box
                  component="img"
                  src={file.previewUrl}
                  alt={file.name}
                  sx={{ width: 48, height: 48, borderRadius: 1, objectFit: 'cover' }}
                />
              ) : (
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    bgcolor: 'error.lighter',
                  }}
                >
                  <Iconify icon="ic:round-filter-list" width={28} />
                </Box>
              )}
              <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                <Typography variant="subtitle2" noWrap>
                  {file.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatFileSize(file.size)}
                </Typography>
              </Box>
              <IconButton size="small" color="error" onClick={() => handleRemove(file.id)}>
                <Iconify icon="solar:trash-bin-trash-bold" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
