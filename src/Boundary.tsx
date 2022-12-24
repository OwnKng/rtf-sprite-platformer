import { RigidBody } from "@react-three/rapier"

export default function Boundary() {
  return (
    <RigidBody position={[0, -5, 0]} name='boundary' type='fixed'>
      <mesh>
        <boxGeometry args={[100, 0.1, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </RigidBody>
  )
}
