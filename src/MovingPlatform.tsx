import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"
import { useRef } from "react"
import { useState } from "react"

const padding = 0.05

export default function MovingPlatform({
  position = [-1, 3, 1],
  dimensions = [0.1, 0.5, 2],
  direction = "x",
  length = 5,
}: {
  position?: [number, number, number]
  dimensions?: [number, number, number]
  direction?: string
  length?: number
}) {
  const ref = useRef<RigidBodyApi>(null!)

  const [width, height, depth] = dimensions

  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const [x, y, z] = position

    const offset = Math.sin(time + timeOffset) * length * 0.5

    ref.current.setNextKinematicTranslation({
      x: x + (direction === "x" ? offset : 0),
      y: y + height * 0.5 + padding + (direction === "y" ? offset : 0),
      z: z + (direction === "z" ? offset : 0),
    })
  })

  return (
    <RigidBody
      ref={ref}
      position={position}
      enabledRotations={[false, false, false]}
      type='kinematicPosition'
    >
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshPhongMaterial color='#202020' />
      </mesh>
    </RigidBody>
  )
}
