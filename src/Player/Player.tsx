import { useKeyboardControls } from "@react-three/drei"
import { useFrame } from "@react-three/fiber"
import { useEffect, useRef, useState } from "react"
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
import { useAppData } from "../hooks/useAppData"

const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const movementVector = new THREE.Vector3()

const SPEED = 3
const RUN_SPEED = 6

export default function Player({
  position = [-4, 3, 0.5],
}: {
  position?: [number, number, number]
}) {
  const sprite = useRef<THREE.Sprite>(null!)
  const ref = useRef<RigidBodyApi>(null!)
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0))

  const t = useRef<number>(0)
  const attacking = useRef<boolean>(false)

  const resetAttack = () => {
    attacking.current = false
    t.current = 0
  }

  const { setWin } = useAppData()

  const recovery = useRef(0)

  const rapier = useRapier()

  const [_, get] = useKeyboardControls()

  const handleCollision = ({ manifold, target, other }) => {
    if (other.rigidBodyObject) {
      if (other.rigidBodyObject.name === "destination") {
        setWin(true)
      }
    }
  }

  useFrame(({ camera }, delta) => {
    const player = ref.current

    const { forward, backward, left, right, jump, attack, run } = get()

    //* Attacking
    if (attack) {
      attacking.current = true
    }

    if (attacking.current) {
      t.current += delta * 1000
      if (t.current > 69 * 6) resetAttack()
      return
    }

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
    cameraTarget.current.lerp(calculateIdealLookAt(player), 0.1)
    camera.lookAt(cameraTarget.current)
  })

  return (
    <RigidBody
      type='dynamic'
      ref={ref}
      enabledRotations={[false, false, false]}
      mass={1}
      onCollisionEnter={handleCollision}
      position={position}
    >
      <CuboidCollider name='player' args={[0.18, 0.25, 0.15]}>
        <Sprite ref={sprite} />
      </CuboidCollider>
    </RigidBody>
  )
}
