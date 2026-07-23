import {
  useEffect,
  useMemo,
  useRef,
} from 'react'

import { useFrame } from '@react-three/fiber'

import {
  PerspectiveCamera,
  useGLTF,
} from '@react-three/drei'

import {
  AnimationMixer,
  MathUtils,
  PerspectiveCamera as ThreePerspectiveCamera,
  Quaternion,
  Vector3,
} from 'three'

import {
  getChapterByProgress,
  type ChapterId,
} from '../../data/chapters'

import { useJourneyStore } from '../../store/useJourneyStore'

const CAMERA_MODEL_PATH =
  '/models/pipeline-camera.glb'

export function BlenderCameraRig() {
  /*
   * This is the actual React Three Fiber camera.
   * Because it is stored in a ref, we are allowed
   * to update it during useFrame.
   */
  const renderCameraRef =
    useRef<ThreePerspectiveCamera>(null)

  const { scene, animations } = useGLTF(
    CAMERA_MODEL_PATH,
  )

  const currentProgress = useRef(0)

  const previousChapterId =
    useRef<ChapterId>('identity')

  const worldPosition = useMemo(
    () => new Vector3(),
    [],
  )

  const worldQuaternion = useMemo(
    () => new Quaternion(),
    [],
  )

  /*
   * Find the camera exported from Blender.
   * This camera provides the animated position,
   * rotation, field of view and clipping settings.
   */
  const sourceCamera = useMemo(() => {
    const cameraObject =
      scene.getObjectByName('CAM_Journey')

    if (
      cameraObject instanceof
      ThreePerspectiveCamera
    ) {
      return cameraObject
    }

    return null
  }, [scene])

  /*
   * Locate the exported Blender animation.
   * The fallbacks make the loader more tolerant
   * if Blender slightly changes the clip name.
   */
  const animationClip = useMemo(() => {
    return (
      animations.find((clip) =>
        clip.name.includes(
          'ACT_JourneyCamera',
        ),
      ) ??
      animations.find((clip) =>
        clip.name.includes(
          'JourneyCamera',
        ),
      ) ??
      animations[0] ??
      null
    )
  }, [animations])

  const mixer = useMemo(
    () => new AnimationMixer(scene),
    [scene],
  )

  const setActiveChapter = useJourneyStore(
    (state) => state.setActiveChapter,
  )

  useEffect(() => {
    if (!sourceCamera) {
      console.error(
        'Blender camera "CAM_Journey" was not found.',
      )

      return
    }

    if (!animationClip) {
      console.error(
        'No Blender camera animation was found.',
      )

      return
    }

    const cameraAction =
      mixer.clipAction(animationClip)

    cameraAction.reset()
    cameraAction.play()

    /*
     * Begin at Blender frame 1 / animation time 0.
     */
    mixer.setTime(0)

    console.info(
      `Loaded Blender camera animation: ${
        animationClip.name
      } (${animationClip.duration.toFixed(
        2,
      )} seconds)`,
    )

    return () => {
      cameraAction.stop()

      mixer.uncacheClip(animationClip)
      mixer.uncacheRoot(scene)
    }
  }, [
    animationClip,
    mixer,
    scene,
    sourceCamera,
  ])

  useFrame((_state, delta) => {
    const renderCamera =
      renderCameraRef.current

    if (
      !renderCamera ||
      !sourceCamera ||
      !animationClip
    ) {
      return
    }

    const targetProgress =
      useJourneyStore.getState()
        .targetProgress

    /*
     * Smoothly move the real camera progress
     * toward the progress requested by scrolling.
     */
    const smoothing =
      1 - Math.exp(-4.5 * delta)

    currentProgress.current +=
      (targetProgress -
        currentProgress.current) *
      smoothing

    const safeProgress = MathUtils.clamp(
      currentProgress.current,
      0,
      1,
    )

    /*
     * Convert browser progress from 0–1 into
     * Blender animation time.
     */
    const animationTime =
      animationClip.duration * safeProgress

    /*
     * Move Blender's animation mixer to the
     * exact requested point in the timeline.
     */
    mixer.setTime(animationTime)

    /*
     * Ensure all animated parent and camera
     * matrices are recalculated.
     */
    scene.updateMatrixWorld(true)

    /*
     * Read the animated Blender camera's final
     * world-space position and rotation.
     */
    sourceCamera.getWorldPosition(
      worldPosition,
    )

    sourceCamera.getWorldQuaternion(
      worldQuaternion,
    )

    /*
     * Apply the Blender transformation to our
     * ref-controlled React Three Fiber camera.
     */
    renderCamera.position.copy(
      worldPosition,
    )

    renderCamera.quaternion.copy(
      worldQuaternion,
    )

    /*
     * Also synchronize Blender's camera settings.
     * This supports future lens animation.
     */
    renderCamera.fov = sourceCamera.fov
    renderCamera.near = sourceCamera.near
    renderCamera.far = sourceCamera.far

    renderCamera.updateProjectionMatrix()

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

  return (
    <>
      {/*
       * This scene contains the invisible source
       * camera and its Blender animation.
       */}
      <primitive object={scene} />

      {/*
       * This is the browser's real rendering camera.
       */}
      <PerspectiveCamera
        ref={renderCameraRef}
        makeDefault
        position={[0, 0, 5]}
        fov={sourceCamera?.fov ?? 42}
        near={sourceCamera?.near ?? 0.1}
        far={sourceCamera?.far ?? 100}
      />
    </>
  )
}

useGLTF.preload(CAMERA_MODEL_PATH)