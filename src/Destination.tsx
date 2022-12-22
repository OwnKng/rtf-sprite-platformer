import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"

export default function Destination({ position = [2, 4, 2] }: any) {
  const obstacle = useRef<RigidBodyApi>(null!)
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()

    const x = Math.sin(time + timeOffset)
    obstacle.current.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1],
      z: position[2],
    })
  })

  return (
    <RigidBody
      ref={obstacle}
      position={position}
      type='kinematicPosition'
      restitution={0.2}
      friction={0}
      name='destination'
    >
      <mesh>
        <boxGeometry args={[5, 0.1, 2]} />
        <meshBasicMaterial wireframe={true} color='blue' />
      </mesh>
    </RigidBody>
  )
}
