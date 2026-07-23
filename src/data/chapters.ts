export type ChapterId =
  | 'identity'
  | 'brain'
  | 'project-arena'
  | 'project-one'

export interface JourneyChapter {
  id: ChapterId
  label: string
  eyebrow: string
  title: string
  description: string
  start: number
  end: number
}

export const journeyChapters: readonly JourneyChapter[] = [
  {
    id: 'identity',
    label: 'Identity',
    eyebrow: 'CHAPTER 01',
    title: 'Prashant Gyawali',
    description:
      'The journey begins with identity before travelling beneath the surface.',
    start: 0,
    end: 0.25,
  },
  {
    id: 'brain',
    label: 'Inside My Mind',
    eyebrow: 'CHAPTER 02',
    title: 'Enter My Mind',
    description:
      'The camera moves beyond the portrait and prepares to enter the brain.',
    start: 0.25,
    end: 0.5,
  },
  {
    id: 'project-arena',
    label: 'Project Arena',
    eyebrow: 'CHAPTER 03',
    title: 'Project Arena',
    description:
      'Three important neurons emerge from a larger neural world.',
    start: 0.5,
    end: 0.75,
  },
  {
    id: 'project-one',
    label: 'Code Meets Reality',
    eyebrow: 'CHAPTER 04',
    title: 'Code Meets Reality',
    description:
      'The first hero neuron activates and opens the initial project experience.',
    start: 0.75,
    end: 1,
  },
]

export function getChapterByProgress(
  progress: number,
): JourneyChapter {
  const clampedProgress = Math.min(1, Math.max(0, progress))

  const matchingChapter = journeyChapters.find(
    (chapter, index) =>
      clampedProgress >= chapter.start &&
      (clampedProgress < chapter.end ||
        index === journeyChapters.length - 1),
  )

  return matchingChapter ?? journeyChapters[0]
}