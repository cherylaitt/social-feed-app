import { create } from "zustand";

export type FeedLayoutMode = "standard" | "creator_first";

type AppState = {
  feedLayoutMode: FeedLayoutMode;
  showSystemAlert: boolean;
  setFeedLayoutMode: (mode: FeedLayoutMode) => void;
  toggleSystemAlert: (show: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  feedLayoutMode: "standard",
  showSystemAlert: false,
  setFeedLayoutMode: (mode) => set({ feedLayoutMode: mode }),
  toggleSystemAlert: (show) => set({ showSystemAlert: show }),
}));
