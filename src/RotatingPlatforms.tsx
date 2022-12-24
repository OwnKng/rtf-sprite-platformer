import { useFrame } from "@react-three/fiber"
import { RigidBody, RigidBodyApi, RigidBodyProps } from "@react-three/rapier"
import { useRef } from "react"
import * as THREE from "three"

type Triple = [number, number, number]

const axis = new THREE.Vector3(0, 1, 0)
const q = new THREE.Quaternion(0, 0, 0)

interface Coordinates {
  position: Triple
}

const coordinates: Coordinates[] = [
  { position: [4.5, 11, 4] },
  { position: [10.5, 11, 7.5] },
  { position: [5.5, 12, 11] },
  { position: [2.5, 12, 11] },
]

export default function RotatingPlatforms() {
  return (
    <>
      {coordinates.map((props, index) => (
        <RotatingPlatform {...props} key={`rotating-${index}`} />
      ))}
    </>
  )
}

const RotatingPlatform = (props: RigidBodyProps) => {
  const ref = useRef<RigidBodyApi>(null!)
  const angle = useRef(0)

  useFrame((_, delta) => {
    angle.current += delta

    q.setFromAxisAngle(axis, angle.current)

    ref.current.setNextKinematicRotation(q)
  })

  return (
    <RigidBody ref={ref} type='kinematicPosition' {...props}>
      <mesh>
        <boxGeometry args={[2, 2, 0.1]} />
        <meshPhongMaterial color='#61CBDC' />
      </mesh>
    </RigidBody>
  )
}
