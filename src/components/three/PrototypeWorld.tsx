import {
  Float,
  Sparkles,
} from '@react-three/drei'
import { BlenderPipelineScene } from './BlenderPipelineScene'

export function PrototypeWorld() {
  return (
    <group>
      <Sparkles
        count={180}
        scale={[16, 8, 34]}
        position={[0, 0, -8]}
        size={1.5}
        speed={0.25}
        opacity={0.45}
        color="#83ff00"
      />

      {/* Chapter 1: Blender pipeline test */}
      <Float
        speed={1.2}
        rotationIntensity={0.25}
        floatIntensity={0.35}
      >
        <BlenderPipelineScene
          position={[0, 0, 0]}
          scale={1}
        />
      </Float>

      <pointLight
        position={[0, 1, 1]}
        color="#83ff00"
        intensity={14}
        distance={8}
      />

      {/* Chapter 2: Brain */}
      <Float
        speed={1}
        rotationIntensity={0.2}
        floatIntensity={0.45}
      >
        <group position={[1.3, 0, -5]}>
          <mesh>
            <sphereGeometry args={[1.15, 48, 48]} />

            <meshStandardMaterial
              color="#d477ff"
              emissive="#5c167d"
              emissiveIntensity={1.3}
              wireframe
            />
          </mesh>

          <mesh scale={0.72}>
            <sphereGeometry args={[1.15, 32, 32]} />

            <meshStandardMaterial
              color="#791ea5"
              roughness={0.4}
            />
          </mesh>
        </group>
      </Float>

      <pointLight
        position={[1.3, 1, -4]}
        color="#d477ff"
        intensity={13}
        distance={7}
      />

      {/* Chapter 3: Project Arena */}
      <group position={[0.3, 0, -10]}>
        <Float
          speed={1.1}
          floatIntensity={0.5}
        >
          <mesh position={[-1.4, -0.15, 0]}>
            <sphereGeometry args={[0.75, 32, 32]} />

            <meshStandardMaterial
              color="#00eaff"
              emissive="#006879"
              emissiveIntensity={1.7}
            />
          </mesh>
        </Float>

        <Float
          speed={1.3}
          floatIntensity={0.45}
        >
          <mesh position={[0, 1.05, -0.2]}>
            <sphereGeometry args={[0.88, 32, 32]} />

            <meshStandardMaterial
              color="#83ff00"
              emissive="#2c7600"
              emissiveIntensity={1.7}
            />
          </mesh>
        </Float>

        <Float
          speed={0.9}
          floatIntensity={0.55}
        >
          <mesh position={[1.45, -0.1, 0.1]}>
            <sphereGeometry args={[0.72, 32, 32]} />

            <meshStandardMaterial
              color="#ff8a3d"
              emissive="#873100"
              emissiveIntensity={1.6}
            />
          </mesh>
        </Float>
      </group>

      <pointLight
        position={[0.3, 1, -9]}
        color="#00eaff"
        intensity={16}
        distance={8}
      />

      {/* Chapter 4: Project One */}
      <Float
        speed={0.8}
        rotationIntensity={0.35}
        floatIntensity={0.3}
      >
        <mesh position={[0.3, 0, -16]}>
          <torusKnotGeometry
            args={[1.05, 0.3, 160, 24]}
          />

          <meshStandardMaterial
            color="#83ff00"
            emissive="#2b7100"
            emissiveIntensity={2}
            roughness={0.18}
            metalness={0.5}
          />
        </mesh>
      </Float>

      <pointLight
        position={[0.3, 1, -15]}
        color="#83ff00"
        intensity={18}
        distance={9}
      />
    </group>
  )
}