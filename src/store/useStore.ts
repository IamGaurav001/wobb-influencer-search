import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProfileSummary } from "@/types";

interface StoreState {
  selectedProfiles: UserProfileSummary[];
  addProfile: (profile: UserProfileSummary) => void;
  removeProfile: (userId: string) => void;
  clearProfiles: () => void;
  isSelected: (userId: string) => boolean;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      selectedProfiles: [],
      addProfile: (profile) => {
        const alreadyExists = get().selectedProfiles.some(
          (p) => p.user_id === profile.user_id
        );
        if (!alreadyExists) {
          set({
            selectedProfiles: [...get().selectedProfiles, profile],
          });
        }
      },
      removeProfile: (userId) => {
        set({
          selectedProfiles: get().selectedProfiles.filter(
            (p) => p.user_id !== userId
          ),
        });
      },
      clearProfiles: () => {
        set({ selectedProfiles: [] });
      },
      isSelected: (userId) => {
        return get().selectedProfiles.some((p) => p.user_id === userId);
      },
    }),
    {
      name: "wobb-selected-influencers",
    }
  )
);
