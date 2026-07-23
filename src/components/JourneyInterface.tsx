import { journeyChapters } from '../data/chapters'
import { useJourneyStore } from '../store/useJourneyStore'

export function JourneyInterface() {
  const activeChapterId = useJourneyStore(
    (state) => state.activeChapterId,
  )

  const chapterIndex =
    journeyChapters.findIndex(
      (chapter) =>
        chapter.id === activeChapterId,
    )

  const chapter =
    journeyChapters[chapterIndex] ??
    journeyChapters[0]

  return (
    <section
      className="interface-layer"
      aria-live="polite"
    >
      <div
        className="hero-copy chapter-copy"
        key={chapter.id}
      >
        <p className="eyebrow">
          {chapter.eyebrow} · {chapter.label}
        </p>

        <h1>{chapter.title}</h1>

        <p className="description">
          {chapter.description}
        </p>

        <div className="status">
          <span className="status-dot" />
          Cinematic journey active
        </div>

        <p className="scroll-hint">
          Scroll, swipe or use the arrow keys
        </p>
      </div>

      <div
        className="chapter-counter"
        aria-label={`Chapter ${
          chapterIndex + 1
        } of ${journeyChapters.length}`}
      >
        <span>
          {String(chapterIndex + 1).padStart(
            2,
            '0',
          )}
        </span>

        <span className="chapter-line" />

        <span>
          {String(journeyChapters.length).padStart(
            2,
            '0',
          )}
        </span>
      </div>
    </section>
  )
}