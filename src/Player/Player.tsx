import { Html, useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import * as THREE from "three"
import { calculateIdealOffset, calculateIdealLookAt } from "../util"
import {
  CuboidCollider,
  RigidBody,
  RigidBodyApi,
  useRapier,
} from "@react-three/rapier"
import * as RAPIER from "@dimforge/rapier3d-compat"
import Sprite from "./Sprite"
import { useEntity } from "../hooks/useEntity"
import HealthBar from "./HealthBar"
import { useStatus } from "../hooks/useStatus"

const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const movementVector = new THREE.Vector3()
const cameraTarget = new THREE.Vector3(0, 0, 0)

const SPEED = 3
const RUN_SPEED = 6

export default function Player() {
  const sprite = useRef<THREE.Sprite>(null!)
  const ref = useRef<RigidBodyApi>(null!)

  const recovery = useRef(0)

  const [, alive, health, hurt] = useEntity(sprite)
  const { setGameOver } = useStatus()

  useEffect(() => {
    if (!alive) setGameOver()
  }, [alive])

  const rapier = useRapier()

  const [_, get] = useKeyboardControls()

  const handleCollision = ({ manifold, target, other }) => {
    if (other.rigidBodyObject) {
      if (other.rigidBodyObject.name === "lava") {
        recovery.current = 1
        hurt(20)
      }
    }
  }

  useFrame(({ camera }, delta) => {
    if (!alive) return null

    const player = ref.current

    const { forward, backward, left, right, jump, run } = get()

    //* jumping
    const world = rapier.world.raw()
    const ray = new RAPIER.Ray(player.translation(), { x: 0, y: -1, z: 0 })
    const maxToi = 10
    const solid = false
    const hit = world.castRay(ray, maxToi, solid)

    const grounded = hit && hit.collider && Math.abs(hit.toi) < 0.25

    if (jump && grounded) player.setLinvel({ x: 0, y: 5, z: 0 })

    frontVector.set(0, 0, Number(backward) - Number(forward))
    sideVector.set(Number(left) - Number(right), 0, 0)

    movementVector
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(Number(run) && grounded ? RUN_SPEED : SPEED)

    //* movement
    const velocity = player.linvel()

    player.setLinvel({
      x: movementVector.x,
      y: velocity.y,
      z: movementVector.z,
    })

    //* recovery
    if (recovery.current > 0) recovery.current -= delta

    //* camera
    const idealOffset = calculateIdealOffset(player)
    camera.position.lerp(idealOffset, 0.1)

    cameraTarget.lerp(calculateIdealLookAt(player), 0.1)

    camera.lookAt(cameraTarget)
  })

  return (
    <>
      {alive && (
        <>
          <RigidBody
            type='dynamic'
            ref={ref}
            enabledRotations={[false, false, false]}
            mass={1}
            position={[0, 2, 4]}
            onCollisionEnter={(c: any) =>
              recovery.current <= 0 ? handleCollision(c) : null
            }
          >
            <CuboidCollider name='player' args={[0.18, 0.25, 0.05]}>
              <HealthBar health={health} />
              <Sprite ref={sprite} />
            </CuboidCollider>
          </RigidBody>
        </>
      )}
    </>
  )
}
