'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Stack } from '@mui/material';
import { SolidButton } from '@/shared/components/Button/SolidButton';
import { Typo } from '@/shared/styles/Typo/Typo';

export default function NotFound() {
  const router = useRouter();

  return (
    <Stack justifyContent="center" alignItems="center" spacing={4} sx={{ minHeight: '100vh' }}>
      <div className="marquee">
        <div className="car">
          <Image
            src="/assets/images/home-images/car-02.svg"
            alt="Car"
            width={300}
            height={200}
            unoptimized
            loading="lazy"
          />
        </div>
      </div>
      <Typo className="text_B_24to38" marginTop={'16px'} content={'페이지를 찾을 수 없습니다'} />
      <SolidButton width={'30%'} onClick={() => router.replace('/')} text={'홈으로 돌아가기'} />

      <style jsx>{`
        .marquee {
          position: relative;
          width: 1000px;
          height: 200px;
          overflow: hidden;
        }
        .car {
          position: absolute;
          top: 0;
          left: -300px;
          animation: drive 4s linear infinite;
        }
        @keyframes drive {
          0% {
            transform: translateX(1000px); /* 오른쪽 바깥에서 시작 */
          }
          100% {
            transform: translateX(-1000px - 300px); / /* 왼쪽 바깥으로 이동 */
          }
        }
      `}</style>
    </Stack>
  );
}
