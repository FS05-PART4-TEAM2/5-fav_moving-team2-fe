'use client';

import { Controller, useFormContext } from 'react-hook-form';
import { Stack, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Typo } from '@/shared/styles/Typo/Typo';
import { colorChips } from '@/shared/styles/colorChips';
import Image from 'next/image';
import { useMediaQuery } from '@mui/system';
import theme from '@/shared/theme';

export default function ProfileImageUploader() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const isMd = useMediaQuery(theme.breakpoints.down('md'));
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <Stack component="section" spacing={1}>
      <Stack direction="row" gap="4px">
        <Typo
          className={isMd ? 'text_SB_16' : 'text_SB_20'}
          style={{ color: colorChips.black[300] }}
          content="프로필 이미지"
        />
        <Typo className={isMd ? 'text_SB_16' : 'text_SB_20'} style={{ color: colorChips.primary[300] }} content="*" />
      </Stack>

      <Typo
        className="text_M_13"
        style={{ color: errors.profileImage ? 'error.main' : colorChips.grayScale[400], textWrap: 'nowrap' }}
        content={
          typeof errors.profileImage?.message === 'string'
            ? `* ${errors.profileImage.message}`
            : '* 10MB 이하로 등록해주세요.'
        }
      />

      <Controller
        name="profileImage"
        control={control}
        rules={{
          validate: (value) => {
            if (!value) return '이미지를 선택해주세요.';
            if (value.size > 10 * 1024 * 1024) return '10MB 이하만 업로드 가능합니다.';
            return true;
          },
        }}
        render={({ field }) => {
          // 업로드 시 미리보기 갱신
          const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0] ?? null;
            field.onChange(file);
            if (file) {
              const url = URL.createObjectURL(file);
              setPreviewUrl(url);
            } else {
              setPreviewUrl(null);
            }
          };

          return (
            <Stack direction="row" spacing={2} alignItems="center" pb={isMd ? '20px' : '32px'}>
              {/* 이미지 미리보기 */}
              <Button
                onClick={() => inputRef.current?.click()}
                style={{
                  width: isMd ? '120px' : '160px',
                  height: isMd ? '120px' : '160px',
                  borderRadius: 8,
                  backgroundColor: '#F5F5F5',
                  overflow: 'hidden',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  src="/assets/images/profile-icon/none-40x40.svg"
                  alt="upload icon"
                  width={isMd ? 32 : 40}
                  height={isMd ? 32 : 40}
                />
              </Button>

              {previewUrl && (
                <Stack
                  sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 8,
                    overflow: 'hidden',
                    border: `1px solid ${colorChips.line.f2f2f2}`,
                    position: 'relative',
                  }}
                >
                  <Image src={previewUrl} alt="preview image" fill style={{ objectFit: 'cover' }} />
                </Stack>
              )}

              {/* 파일 업로드 input (숨김) */}
              <input type="file" accept="image/*" hidden ref={inputRef} onChange={handleFileChange} />
            </Stack>
          );
        }}
      />
    </Stack>
  );
}
