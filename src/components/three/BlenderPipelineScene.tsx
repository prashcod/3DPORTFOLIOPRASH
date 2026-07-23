import type { ThreeElements } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'

type BlenderPipelineSceneProps =
  ThreeElements['group']

const MODEL_PATH = '/models/pipeline-core.glb'

export function BlenderPipelineScene(
  props: BlenderPipelineSceneProps,
) {
  const { scene } = useGLTF(MODEL_PATH)

  return (
    <group {...props}>
      <primitive
        object={scene}
        dispose={null}
      />
    </group>
  )
}

useGLTF.preload(MODEL_PATH)