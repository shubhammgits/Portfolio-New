import { create } from 'zustand';

interface SceneState {
  // Loading State
  isLoading: boolean;
  loadingProgress: number;
  setLoadingProgress: (progress: number) => void;
  setIsLoading: (loading: boolean) => void;

  // Scroll State
  scrollProgress: number;
  setScrollProgress: (progress: number) => void;

  // Navigation State
  currentSection: number;
  setCurrentSection: (section: number) => void;

  // Mouse Position (Normalized -1 to 1)
  mousePosition: { x: number; y: number };
  setMousePosition: (position: { x: number; y: number }) => void;

  // Project Focus Mode
  focusedProject: number | null;
  setFocusedProject: (projectId: number | null) => void;

  // Like Count
  likeCount: number;
  incrementLikes: () => void;

  // Audio State
  isAudioPlaying: boolean;
  setIsAudioPlaying: (playing: boolean) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  // Loading
  isLoading: false,
  loadingProgress: 100,
  setLoadingProgress: (progress) => set({ loadingProgress: progress }),
  setIsLoading: (loading) => set({ isLoading: loading }),

  // Scroll
  scrollProgress: 0,
  setScrollProgress: (progress) => set({ scrollProgress: progress }),

  // Navigation
  currentSection: 0,
  setCurrentSection: (section) => set({ currentSection: section }),

  // Mouse
  mousePosition: { x: 0, y: 0 },
  setMousePosition: (position) => set({ mousePosition: position }),

  // Projects
  focusedProject: null,
  setFocusedProject: (projectId) => set({ focusedProject: projectId }),

  // Likes
  likeCount: 247, // Mock initial count
  incrementLikes: () => set((state) => ({ likeCount: state.likeCount + 1 })),

  // Audio
  isAudioPlaying: false,
  setIsAudioPlaying: (playing) => set({ isAudioPlaying: playing }),
}));
