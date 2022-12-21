import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { calculateIdealOffset, calculateIdealLookAt } from "./util"
import {
  CuboidCollider,
  RigidBody,
  RigidBodyApi,
  useRapier,
} from "@react-three/rapier"
import * as RAPIER from "@dimforge/rapier3d-compat"
import Sprite from "./Sprite"

const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const movementVector = new THREE.Vector3()
const cameraTarget = new THREE.Vector3(0, 0, 0)

const SPEED = 3
const RUN_SPEED = 6

export default function Player() {
  const ref = useRef<RigidBodyApi>(null!)
  const sprite = useRef<THREE.Sprite>(null!)

  const rapier = useRapier()

  const [_, get] = useKeyboardControls()

  useFrame(({ camera }) => {
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

    sprite.current.position.copy(player.translation())

    //* camera
    const idealOffset = calculateIdealOffset(player)
    camera.position.lerp(idealOffset, 0.1)

    cameraTarget.lerp(calculateIdealLookAt(player), 0.1)

    camera.lookAt(cameraTarget)
  })

  return (
    <>
      <RigidBody
        ref={ref}
        type='dynamic'
        enabledRotations={[false, false, false]}
        mass={1}
        colliders={false}
        position={[0, 2, 4]}
      >
        <CuboidCollider args={[0.18, 0.25, 0.05]} />
      </RigidBody>
      <Sprite ref={sprite} />
    </>
  )
}
