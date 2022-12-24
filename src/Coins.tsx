import { useFrame } from "@react-three/fiber"
import { RigidBody, RigidBodyApi } from "@react-three/rapier"
import { useAppData } from "./hooks/useAppData"
import { useRef } from "react"
import * as THREE from "three"

const axis = new THREE.Vector3(1, 0, 0)
const q = new THREE.Quaternion(0, 0, 0)

export default function Coins() {
  const coins = useAppData((state) => state.coins)

  return (
    <>
      {coins.map((coin, index) => (
        <Coin id={coin.id} position={coin.position} key={`coin-${coin.id}`} />
      ))}
    </>
  )
}

const Coin = ({
  id,
  position,
}: {
  id: number
  position: [number, number, number]
}) => {
  const ref = useRef<RigidBodyApi>(null!)
  const angle = useRef(0)

  const collect = useAppData((state) => state.collectCoin)

  const handleCollision = ({ other }: any) => {
    if (other.colliderObject) {
      if (other.colliderObject.name === "player") {
        collect(id)
      }
    }
  }

  useFrame((_, delta) => {
    angle.current += delta

    q.setFromAxisAngle(axis, angle.current)

    ref.current.setNextKinematicRotation(q)
  })

  return (
    <RigidBody
      ref={ref}
      position={position}
      type='kinematicPosition'
      colliders='ball'
      onCollisionEnter={handleCollision}
    >
      <mesh castShadow>
        <icosahedronGeometry args={[0.2, 0]} />
        <meshPhongMaterial color='tomato' flatShading />
      </mesh>
    </RigidBody>
  )
}
