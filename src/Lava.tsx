import { RigidBody } from "@react-three/rapier"
import { useRef } from "react"
import { useEntity } from "./hooks/useEntity"

export default function Lava() {
  const ref = useRef<THREE.Mesh>(null!)
  useEntity(ref)

  return (
    <RigidBody position={[2, 3, -2]} type='fixed' name='lava'>
      <mesh ref={ref}>
        <boxGeometry args={[5, 0.1, 2]} />
        <meshBasicMaterial wireframe={true} color='red' />
      </mesh>
    </RigidBody>
  )
}
