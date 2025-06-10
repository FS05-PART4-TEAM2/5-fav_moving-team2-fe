import customAxios from '@/lib/customAxios';
import { AssignMoverResponse } from '@/shared/types/types';

interface AssignMoverResponseData {
  success: boolean;
  data: AssignMoverResponse;
  message: string;
}

export async function postAssignMoverApi(moverId: string) {
  const res = await customAxios.post<AssignMoverResponseData>(`/api/assignMover/${moverId}`);
  return res.data;
}
