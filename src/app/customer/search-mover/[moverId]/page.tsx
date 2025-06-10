import { Metadata } from 'next';
import { Stack } from '@mui/material';
import { getMoverDetailApi } from './core/service/getMoverDetailApi';
import { MoverInfoFeature } from './features/MoverInfo/feature';
import { ClientInteractions } from './components/ClientInteractions';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    moverId: string;
  }>;
}

// 동적 메타태그 생성 TODO: 여기 요구사항에 맞게 수정
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { moverId } = await params;
    const response = await getMoverDetailApi(moverId);

    if (!response.success) {
      return {
        title: '기사님을 찾을 수 없습니다',
        description: '요청하신 기사님 정보를 찾을 수 없습니다.',
      };
    }

    const moverInfo = response.data;

    return {
      title: `무빙 : ${moverInfo.nickname} 기사님`,
      description: `${moverInfo.intro} | 경력 ${moverInfo.career}년 | 평점 ${moverInfo.totalRating.toFixed(1)}`,
      openGraph: {
        title: `${moverInfo.nickname} 기사님`,
        description: moverInfo.intro,
        images: moverInfo.profileImage ? [moverInfo.profileImage] : [],
      },
    };
  } catch (error) {
    return {
      title: '무빙 : 기사님 정보',
      description: '기사님 상세 정보를 확인해보세요.',
    };
  }
}

export default async function Page({ params }: PageProps) {
  const { moverId } = await params;

  try {
    // 서버에서 기사님 정보만 페치
    const moverResponse = await getMoverDetailApi(moverId);

    if (!moverResponse.success) {
      notFound();
    }

    const moverInfo = moverResponse.data;

    // TODO: 공유URL 수정 - 현재페이지
    const shareUrl = `/customer/search-mover/${moverId}`;
    const shareLinkTitle = '나만 알기엔 아쉬운 기사님인가요?';

    const moverInfoProps = {
      data: moverInfo,
      shareUrl: shareUrl,
      shareLinkTitle: shareLinkTitle,
      moverId: moverId, // 리뷰 데이터 대신 moverId 전달
    };

    return (
      <>
        <Stack sx={contentContainerSx}>
          <MoverInfoFeature {...moverInfoProps} />
          {/* 클라이언트 인터랙션 컴포넌트 */}
          <ClientInteractions moverId={moverId} shareUrl={shareUrl} shareLinkTitle={shareLinkTitle} />
        </Stack>
      </>
    );
  } catch (error) {
    notFound();
  }
}

const contentContainerSx = {
  flexDirection: { xs: 'column', md: 'row' },
  justifyContent: { xs: 'flex-start', md: 'space-between' },
  gap: { xs: '0px', md: '120px' },
  height: '100%',
  paddingTop: { xs: '16px', sm: '24px' },
  paddingBottom: '110px', // 모바일 플로팅버튼 높이 포함
};
