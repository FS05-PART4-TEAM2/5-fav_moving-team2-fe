import customAxios from '@/lib/customAxios';

export async function fetchSentQuotations({ pageParam = 1 }) {
  const res = await customAxios.get('/api/quotation/mover/sent', {
    params: { page: pageParam, limit: 8 },
  });
  return res.data.data;
}

export async function fetchRejectedQuotations({ pageParam = 1 }) {
  const res = await customAxios.get('/api/assignMover/reject', {
    params: { page: pageParam, limit: 8 },
  });
  return res.data.data;
}
