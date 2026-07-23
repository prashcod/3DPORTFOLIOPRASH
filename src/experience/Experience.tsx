import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from '@react-three/drei'

import { RotatingCube } from '../components/three/RotatingCube'

export function Experience() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{
        antialias: true,
        alpha: false,
      }}
    >
      <color attach="background" args={['#050505']} />

      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5]}
        fov={45}
      />

      <ambientLight intensity={0.6} />

      <directionalLight
        position={[4, 5, 3]}
        intensity={3}
      />

      <Suspense fallback={null}>
        <RotatingCube />

        <Environment preset="city" />
      </Suspense>

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={8}
      />
    </Canvas>
  )
}