import { RigidBody } from "@react-three/rapier"
import { useAppData } from "./hooks/useAppData"

export default function Stars() {
  const stars = useAppData((state) => state.stars)

  return (
    <>
      {stars.map((star, index) => (
        <Star id={star.id} position={star.position} key={`star-${index}`} />
      ))}
    </>
  )
}

const Star = ({
  id,
  position,
}: {
  id: number
  position: [number, number, number]
}) => {
  const collect = useAppData((state) => state.collectStar)

  const handleCollision = ({ other }) => {
    if (other.colliderObject) {
      if (other.colliderObject.name === "player") {
        collect(id)
      }
    }
  }

  return (
    <RigidBody
      position={position}
      type='fixed'
      onCollisionEnter={handleCollision}
    >
      <mesh>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </RigidBody>
  )
}
