import { useFrame } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"
import { useRef, useState } from "react"
import { RigidBodyApi } from "@react-three/rapier/dist/declarations/src/types"

export default function Destination({ position = [2, 4, 2] }: any) {
  const obstacle = useRef<RigidBodyApi>(null!)

  return (
    <RigidBody
      type='fixed'
      position={position}
      restitution={0.2}
      friction={0}
      name='destination'
    >
      <mesh>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshBasicMaterial color='tomato' />
      </mesh>
    </RigidBody>
  )
}
