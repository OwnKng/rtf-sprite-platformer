import { RigidBody } from "@react-three/rapier"
import { RigidBodyApi } from "@react-three/rapier"
import { useRef } from "react"
import { useEntity } from "../hooks/useEntity"

export default function Enemy() {
  const ref = useRef<RigidBodyApi>(null!)
  useEntity(ref)

  return (
    <RigidBody ref={ref} type='dynamic' name='enemy'>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </RigidBody>
  )
}
