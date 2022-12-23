import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"
import { useRef } from "react"
import { useEntity } from "./hooks/useEntity"
import { useState } from "react"

export default function Lava({
  position = [0, 3, 2],
}: {
  position?: [number, number, number]
}) {
  const ref = useRef<RigidBodyApi>(null!)

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const x = Math.sin(time + timeOffset)
    ref.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1],
      z: position[2],
    })
  })

  return (
    <RigidBody
      ref={ref}
      position={position}
      name='lava'
      type='kinematicPosition'
    >
      <mesh>
        <boxGeometry args={[0.05, 0.5, 2]} />
        <meshBasicMaterial wireframe={true} color='red' />
      </mesh>
    </RigidBody>
  )
}
