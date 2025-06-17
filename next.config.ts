import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
  },

  async rewrites() {
    return [
      // customer API
      { source: '/api/quotation/customer', destination: 'http://localhost:4000/api/quotation/customer' },
      {
        source: '/api/receivedQuo/customer/pending',
        destination: 'http://localhost:4000/api/receivedQuo/customer/pending',
      },
      {
        source: '/api/receivedQuo/customer/completed',
        destination: 'http://localhost:4000/api/receivedQuo/customer/completed',
      },
      {
        source: '/api/receivedQuo/customer/pending/:offerId',
        destination: 'http://localhost:4000/api/receivedQuo/customer/pending/:offerId',
      },
      { source: '/api/review/customer/offer', destination: 'http://localhost:4000/api/review/customer/offer' },
      {
        source: '/api/review/customer/:customerId',
        destination: 'http://localhost:4000/api/review/customer/:customerId',
      },
      {
        source: '/api/review/customer/offer/:offerId',
        destination: 'http://localhost:4000/api/review/customer/offer/:offerId',
      },

      // mover 견적 관련
      { source: '/api/quotation/mover', destination: 'http://localhost:4000/api/quotation/mover' },
      { source: '/api/quotation/mover/sent', destination: 'http://localhost:4000/api/quotation/mover/sent' },
      { source: '/api/quotation/mover/sent/:id', destination: 'http://localhost:4000/api/quotation/mover/sent/:id' },
      { source: '/api/quotation/mover/count', destination: 'http://localhost:4000/api/quotation/mover/count' },

      // mover 배정/거절 관련
      { source: '/api/assignMover/:moverId', destination: 'http://localhost:4000/api/assignMover/:moverId' },
      { source: '/api/assignMover/reject', destination: 'http://localhost:4000/api/assignMover/reject' },
      { source: '/api/assignMover', destination: 'http://localhost:4000/api/assignMover' },

      // mover 상세/리뷰 조회
      { source: '/api/mover', destination: 'http://localhost:4000/api/mover' },
      { source: '/api/mover/:moverId', destination: 'http://localhost:4000/api/mover/:moverId' },
      { source: '/api/review/:moverId', destination: 'http://localhost:4000/api/review/:moverId' },
      { source: '/api/review/:moverId', destination: 'http://localhost:4000/api/review/:moverId' }, // getReviewList + getMoverReviewListApi

      // 찜 기능 (like)
      { source: '/api/like/customer', destination: 'http://localhost:4000/api/like/customer' },
      { source: '/api/like/:moverId/customer', destination: 'http://localhost:4000/api/like/:moverId/customer' },

      // 알림(Notification)
      { source: '/api/notifications', destination: 'http://localhost:4000/api/notifications' },

      // 프로필 수정 및 조회
      { source: '/api/profile/mover/info', destination: 'http://localhost:4000/api/profile/mover/info' },
      { source: '/api/profile/mover', destination: 'http://localhost:4000/api/profile/mover' },
      { source: '/api/profile/customer', destination: 'http://localhost:4000/api/profile/customer' },
      { source: '/api/profile/:userType', destination: 'http://localhost:4000/api/profile/:userType' },

      // 인증 (OAuth & 일반)
      {
        source: '/api/auth/:provider/:userType/login',
        destination: 'http://localhost:4000/api/auth/:provider/:userType/login',
      },
      {
        source: '/api/auth/:userType/:action(login|signup)',
        destination: 'http://localhost:4000/api/auth/:userType/:action',
      },
      { source: '/api/auth/logout', destination: 'http://localhost:4000/api/auth/logout' },
    ];
  },
};

export default nextConfig;
