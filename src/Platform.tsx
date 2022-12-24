import { MeshProps } from "@react-three/fiber"
import { RigidBody } from "@react-three/rapier"

type Triple = [number, number, number]

type coordinatesType = {
  position: Triple
  rotation: Triple
}

const coordinates: coordinatesType[] = [
  // level one
  {
    position: [-2, 1, 0],
    rotation: [0, 0, 0],
  },
  {
    position: [5, 1, 2],
    rotation: [0, 0, 0],
  },
  {
    position: [10, 1, 2],
    rotation: [0, 0, 0],
  },
  {
    position: [2, 2, -1],
    rotation: [0, 0, 0],
  },
  {
    position: [-1, 3, 1],
    rotation: [0, 0, 0],
  },
  // level two
  {
    position: [10, 5, 1],
    rotation: [0, 0, 0],
  },
  {
    position: [4, 5, 1],
    rotation: [0, 0, 0],
  },
  // level three
  {
    position: [-2, 10, 1],
    rotation: [0, 0, 0],
  },
  {
    position: [4, 10, 1],
    rotation: [0, 0, 0],
  },
  {
    position: [4, 10, 4],
    rotation: [0, 0, 0],
  },

  {
    position: [9, 10, 4],
    rotation: [0, 0, 0],
  },
  {
    position: [10.5, 10, 7.5],
    rotation: [0, -Math.PI * 0.5, 0],
  },
  {
    position: [9, 10, 11],
    rotation: [0, 0, 0],
  },
  {
    position: [4, 11, 11],
    rotation: [0, 0, 0],
  },
  {
    position: [-1, 10, 11],
    rotation: [0, 0, 0],
  },
  // Level 4
  {
    position: [-2, 15, 7.5],
    rotation: [0, -Math.PI * 0.5, 0],
  },
  {
    position: [1.5, 15, 6],
    rotation: [0, 0, 0],
  },
  {
    position: [5, 15, 4.5],
    rotation: [0, -Math.PI * 0.5, 0],
  },
  {
    position: [5, 15, -0.5],
    rotation: [0, -Math.PI * 0.5, 0],
  },
]

export default function Platforms() {
  return (
    <RigidBody type='fixed'>
      {coordinates.map((props, index) => (
        <Platform {...props} key={index} />
      ))}
    </RigidBody>
  )
}

const Platform = (props: MeshProps) => {
  return (
    <mesh {...props} receiveShadow>
      <boxGeometry args={[5, 0.05, 2]} />
      <meshPhongMaterial color='#202020' shininess={0} />
    </mesh>
  )
}
