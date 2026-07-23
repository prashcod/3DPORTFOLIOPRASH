import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  CatmullRomCurve3,
  MathUtils,
  Vector3,
} from 'three'

import {
  getChapterByProgress,
  type ChapterId,
} from '../../data/chapters'

import { useJourneyStore } from '../../store/useJourneyStore'

export function CameraRig() {
  const currentProgress = useRef(0)

  const previousChapterId =
    useRef<ChapterId>('identity')

  const setActiveChapter = useJourneyStore(
    (state) => state.setActiveChapter,
  )

  const cameraPath = useMemo(
    () =>
      new CatmullRomCurve3(
        [
          new Vector3(0, 0.3, 6.5),
          new Vector3(-1.8, 0.4, 3),
          new Vector3(-2.4, 0.5, -1.5),
          new Vector3(-2.8, 0.3, -6.5),
          new Vector3(-3.5, 0.5, -11.5),
          new Vector3(-2, 0.3, -13),
        ],
        false,
        'catmullrom',
        0.35,
      ),
    [],
  )

  const targetPosition = useMemo(
    () => new Vector3(),
    [],
  )

  const tangent = useMemo(
    () => new Vector3(),
    [],
  )

  const lookTarget = useMemo(
    () => new Vector3(),
    [],
  )

  useFrame(({ camera }, delta) => {
    const targetProgress =
      useJourneyStore.getState().targetProgress

    const smoothing =
      1 - Math.exp(-4.5 * delta)

    currentProgress.current +=
      (targetProgress - currentProgress.current) *
      smoothing

    const safeProgress = MathUtils.clamp(
      currentProgress.current,
      0,
      0.999,
    )

    cameraPath.getPointAt(
      safeProgress,
      targetPosition,
    )

    cameraPath.getTangentAt(
      safeProgress,
      tangent,
    )

    tangent.normalize()

    lookTarget
      .copy(targetPosition)
      .addScaledVector(tangent, 8)

    camera.position.copy(targetPosition)
    camera.lookAt(lookTarget)

    const activeChapter =
      getChapterByProgress(
        currentProgress.current,
      )

    if (
      activeChapter.id !==
      previousChapterId.current
    ) {
      previousChapterId.current =
        activeChapter.id

      setActiveChapter(activeChapter.id)
    }
  })

  return null
}