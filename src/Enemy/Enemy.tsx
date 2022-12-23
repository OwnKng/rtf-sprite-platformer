import { RigidBody } from "@react-three/rapier"
import { RigidBodyApi } from "@react-three/rapier"
import { useRef } from "react"
import { useEntity } from "../hooks/useEntity"
import HealthBar from "../HealthBar"
import { useAppData } from "../hooks/useAppData"
import { useEffect } from "react"

export default function Enemy({
  position = [0, 2, 4],
}: {
  position: [number, number, number]
}) {
  const ref = useRef<RigidBodyApi>(null!)
  const [, health] = useEntity(ref)

  const entitiesRef = useRef(useAppData.getState().entities)

  useEffect(
    () =>
      useAppData.subscribe((state) => (entitiesRef.current = state.entities)),
    []
  )

  const handleCollision = () => {
    console.log(entitiesRef.current)
  }

  return (
    <RigidBody
      type='dynamic'
      name='enemy'
      position={position}
      onCollisionEnter={handleCollision}
    >
      <mesh ref={ref}>
        <boxGeometry />
        <meshBasicMaterial wireframe />
      </mesh>
      <HealthBar health={health} />
    </RigidBody>
  )
}
