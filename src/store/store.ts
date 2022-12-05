import create from 'zustand';

type BoardUpdate = {
  boardId: string;
  title: string;
  owner: string;
  users: string[];
};

interface Store {
  isLogin: boolean;
  currentBoard: BoardUpdate;
  setСurrentBoard: (obj: BoardUpdate) => void;
  setIsLogin: (obj: boolean) => void;
}

export const useStore = create<Store>()((set) => ({
  isLogin: false,
  currentBoard: {
    boardId: '',
    title: '',
    owner: '',
    users: ['']
  },
  setСurrentBoard: (data) => set((state) => ({ currentBoard: data })),
  setIsLogin: (data) => set((state) => ({ isLogin: data }))
}));
