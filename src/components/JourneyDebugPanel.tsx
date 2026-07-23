import {
  journeyChapters,
} from '../data/chapters'

import { useJourneyStore } from '../store/useJourneyStore'

export function JourneyDebugPanel() {
  const targetProgress = useJourneyStore(
    (state) => state.targetProgress,
  )

  const activeChapterId = useJourneyStore(
    (state) => state.activeChapterId,
  )

  const setTargetProgress = useJourneyStore(
    (state) => state.setTargetProgress,
  )

  const resetJourney = useJourneyStore(
    (state) => state.resetJourney,
  )

  const activeChapterIndex =
    journeyChapters.findIndex(
      (chapter) =>
        chapter.id === activeChapterId,
    )

  const goToChapter = (index: number) => {
    const boundedIndex = Math.min(
      journeyChapters.length - 1,
      Math.max(0, index),
    )

    const chapter =
      journeyChapters[boundedIndex]

    setTargetProgress(
      Math.min(1, chapter.start + 0.015),
    )
  }

  return (
    <aside className="journey-debug">
      <div className="debug-heading">
        <span>Journey controller</span>

        <output>
          {Math.round(targetProgress * 100)}%
        </output>
      </div>

      <label
        className="debug-label"
        htmlFor="journey-progress"
      >
        Camera progress
      </label>

      <input
        id="journey-progress"
        type="range"
        min="0"
        max="1"
        step="0.001"
        value={targetProgress}
        onChange={(event) => {
          setTargetProgress(
            Number(event.target.value),
          )
        }}
      />

      <div className="debug-buttons">
        <button
          type="button"
          disabled={activeChapterIndex <= 0}
          onClick={() =>
            goToChapter(activeChapterIndex - 1)
          }
        >
          Previous
        </button>

        <button
          type="button"
          onClick={resetJourney}
        >
          Reset
        </button>

        <button
          type="button"
          disabled={
            activeChapterIndex >=
            journeyChapters.length - 1
          }
          onClick={() =>
            goToChapter(activeChapterIndex + 1)
          }
        >
          Next
        </button>
      </div>
    </aside>
  )
}