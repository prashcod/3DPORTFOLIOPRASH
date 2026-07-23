import { create } from 'zustand'

import type { ChapterId } from '../data/chapters'

interface JourneyState {
  targetProgress: number
  activeChapterId: ChapterId
  inputEnabled: boolean

  setTargetProgress: (progress: number) => void
  addProgress: (amount: number) => void
  setActiveChapter: (chapterId: ChapterId) => void
  setInputEnabled: (enabled: boolean) => void
  resetJourney: () => void
}

function clampProgress(progress: number): number {
  return Math.min(1, Math.max(0, progress))
}

export const useJourneyStore = create<JourneyState>()((set) => ({
  targetProgress: 0,
  activeChapterId: 'identity',
  inputEnabled: true,

  setTargetProgress: (progress) => {
    set({
      targetProgress: clampProgress(progress),
    })
  },

  addProgress: (amount) => {
    set((state) => ({
      targetProgress: clampProgress(
        state.targetProgress + amount,
      ),
    }))
  },

  setActiveChapter: (chapterId) => {
    set({
      activeChapterId: chapterId,
    })
  },

  setInputEnabled: (enabled) => {
    set({
      inputEnabled: enabled,
    })
  },

  resetJourney: () => {
    set({
      targetProgress: 0,
      activeChapterId: 'identity',
      inputEnabled: true,
    })
  },
}))