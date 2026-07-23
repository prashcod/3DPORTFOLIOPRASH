import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

export function RotatingCube() {
  const cubeRef = useRef<Mesh>(null)

  useFrame((_state, delta) => {
    if (!cubeRef.current) {
      return
    }

    cubeRef.current.rotation.x += delta * 0.25
    cubeRef.current.rotation.y += delta * 0.45
  })

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1.6, 1.6, 1.6]} />

      <meshStandardMaterial
        color="#83ff00"
        roughness={0.25}
        metalness={0.45}
      />
    </mesh>
  )
}