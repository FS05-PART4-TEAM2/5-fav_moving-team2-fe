import { Box, Stack } from '@mui/material';
import Image from 'next/image';
import { UserData } from './Card';
import { Typo } from '@/shared/styles/Typo/Typo';

export default function CommonCardInfo() {
  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" sx={{ gap: { md: '12px', lg: '24px' } }}>
          <Stack
            sx={{
              width: {
                md: 46,
                lg: 56,
              },
              height: {
                md: 46,
                lg: 56,
              },
              borderRadius: '50%',
              overflow: 'hidden',
              border: `2px solid black`,
              position: 'relative',
            }}
          >
            <Image src={UserData.userProfileImage} alt="user profile Image" fill style={{ objectFit: 'cover' }} />
          </Stack>

          <Stack direction="column">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Stack alignItems="center">{UserData.name} 기사님</Stack>
            </Stack>
            <Stack direction="row">
              <Stack direction="row">
                <Image src="/assets/images/start-icon/star-yellow-24x24.svg" alt="like icon" width={24} height={24} />{' '}
                <Typo className="text_M_16">{/*리뷰 5점만점 백분율 자리*/} </Typo>
                <Typo className="text_M_16"> {`(${UserData.review.reviewer})`} </Typo>
              </Stack>
              <Stack direction="row" gap="6px">
                <Typo className="text_M_16">경력</Typo>
                <Typo className="text_M_16">{UserData.present}년</Typo>
              </Stack>
              <Stack direction="row" gap="6px">
                <Typo className="text_M_16">{UserData.confirmation}건 </Typo>
                <Typo className="text_M_16">확정</Typo>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction="row">
          <Image src="/assets/images/like-icon/like-24x24-black.svg" alt="like icon" width={24} height={24} />
          {UserData.likeCount}
        </Stack>
      </Stack>
    </>
  );
}
