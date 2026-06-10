import { create } from "zustand";

export type FeedLayoutMode = "standard" | "creator_first";

type AppState = {
  feed_layout_mode: FeedLayoutMode;
  show_system_alert: boolean;
  setFeedLayoutMode: (mode: FeedLayoutMode) => void;
  setShowSystemAlert: (show: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  feed_layout_mode: "standard",
  show_system_alert: false,
  setFeedLayoutMode: (mode) => set({ feed_layout_mode: mode }),
  setShowSystemAlert: (show) => set({ show_system_alert: show }),
}));
