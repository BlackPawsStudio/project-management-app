import create from 'zustand';
import { ColumnType } from '../utils/types';

interface BearState {
  column: ColumnType[];
  setColumn: (by: ColumnType[]) => void;
}

export const useStore = create<BearState>()((set) => ({
  column: [],
  setColumn: (data) => set((state) => ({ column: data }))
}));
