import { create } from 'zustand';
import { User } from '../types/auth';
import { persist } from 'zustand/middleware';
import { getUser } from '../services/auth.service';

type AuthStoreState = {
  user?: User | undefined;
};

type AuthStoreActions = {
  fetchUser(): void;
  resetUser(): void;
};

type AuthStore = AuthStoreState & AuthStoreActions;

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: undefined,
      async fetchUser() {
        try {
          const user = await getUser();
          set({ user });
        } catch (error) {
          set({ user: undefined });
        }
      },
      resetUser() {
        set({ user: undefined });
      },
    }),
    { name: 'user-store' }
  )
);
