'use client';
import { colorChips } from '@/shared/styles/colorChips';
import { Typo } from '@/shared/styles/Typo/Typo';
import theme from '@/shared/theme';
import { Stack, Button } from '@mui/material';
import { useMediaQuery } from '@mui/system';
import Image from 'next/image';

const OAuthItems = [
  { name: 'google', icon: '/assets/images/oauth-icon/google-icon-72x72.svg', alt: '구글' },
  { name: 'kakao', icon: '/assets/images/oauth-icon/kakao-icon-72x72.svg', alt: '카카오' },
  { name: 'naver', icon: '/assets/images/oauth-icon/naver-icon-72x72.svg', alt: '네이버' },
] as const;

type OAuthItemsProps = (typeof OAuthItems)[number]['name'];

interface AuthFormOAuthProps {
  userType: 'customer' | 'mover';
}

export default function AuthFormOAuth({ userType }: AuthFormOAuthProps) {
  const isMd = useMediaQuery(theme.breakpoints.down('md'));

  const OAuthImageSize = isMd ? 54 : 72;

  const handleOAuthLogin = async (provider: OAuthItemsProps) => {
    const redirectURL = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${provider}/${userType}/login`;
    window.location.href = redirectURL;
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center" pt="16px" gap="24px">
      <Typo
        className={isMd ? 'text_R_12' : 'text_R_20'}
        style={{ color: isMd ? colorChips.black[100] : colorChips.black[200] }}
      >
        SNS 계정으로 간편 가입하기
      </Typo>
      <Stack direction="row" justifyContent="center">
        {OAuthItems.map(({ name, icon, alt }) => (
          <Button key={name} onClick={() => handleOAuthLogin(name)}>
            <Image src={icon} alt={`${alt} 로그인`} width={OAuthImageSize} height={OAuthImageSize} />
          </Button>
        ))}
      </Stack>
    </Stack>
  );
}
