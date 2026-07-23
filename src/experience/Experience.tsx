import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import { CameraRig } from '../components/three/CameraRig'
import { PrototypeWorld } from '../components/three/PrototypeWorld'

export function Experience() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{
        position: [0, 0.3, 6.5],
        fov: 45,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
    >
      <color
        attach="background"
        args={['#030303']}
      />

      <fog
        attach="fog"
        args={['#030303', 8, 28]}
      />

      <ambientLight intensity={0.35} />

      <directionalLight
        position={[4, 6, 5]}
        intensity={2.5}
      />

      <Suspense fallback={null}>
        <PrototypeWorld />
        <Environment preset="city" />
      </Suspense>

      <CameraRig />
    </Canvas>
  )
}