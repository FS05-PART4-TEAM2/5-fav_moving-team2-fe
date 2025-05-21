'use client';

import { SolidButton } from '@/shared/components/Button/SolidButton';
import { CommonLayout } from '@/shared/components/Layout/CommonLayout';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';

export default function Home() {
  const router = useRouter();

  return (
    <CommonLayout>
      {/* TODO: 나중에 랜딩페이지 완성해서 추가하기 */}
      {/* <LandingPage /> */}

      {/* 임시 화면 */}
      <Stack direction="column" gap="20px" alignItems="center" justifyContent="center" height="100%">
        임시 랜딩페이지 텍스트
        <SolidButton buttonSize="sm" text="샘플페이지 이동하기" onClick={() => router.push('/sample')} />
      </Stack>
    </CommonLayout>
  );
}
