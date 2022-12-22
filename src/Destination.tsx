import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useStatus } from "./hooks/useStatus"
import { useState } from "react"
import { useRef } from "react"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"

export default function Destination({ position = [2, 4, 2] }: any) {
  const obstacle = useRef<RigidBodyApi>(null!)
  const [timeOffset] = useState(() => Math.random() * Math.PI * 2)

  const { setWin } = useStatus()

  const handleContact = ({ other }) => {
    if (other.colliderObject) {
      if (other.colliderObject.name === "player") {
        setWin()
      }
    }
  }

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
      onCollisionEnter={handleContact}
    >
      <mesh>
        <boxGeometry args={[5, 0.1, 2]} />
        <meshBasicMaterial wireframe={true} color='blue' />
      </mesh>
    </RigidBody>
  )
}
