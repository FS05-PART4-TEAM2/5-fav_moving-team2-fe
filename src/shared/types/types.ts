export type UserType = 'customer' | 'mover' | 'temp';
export type MovingType = 'SMALL_MOVE' | 'FAMILY_MOVE' | 'OFFICE_MOVE';

export interface CustomerRequestParams {
  moveType: MovingType | null;
  moveDate: string;
  startAddress: string;
  endAddress: string;
}
