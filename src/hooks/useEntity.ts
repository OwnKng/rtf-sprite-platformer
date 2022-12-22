import { Ref, useEffect, useLayoutEffect, useRef, useState } from "react"
import * as THREE from "three"
import { useEntities } from "./useEntities"

const pos = new THREE.Vector3()
const r = new THREE.Euler()

export const useEntity = (ref: Ref<THREE.Mesh | THREE.Sprite>) => {
  const { createEntity } = useEntities()
  const [alive, setAlive] = useState(true)
  const [health, setHealth] = useState(100)

  const hurt = (damage: number) => setHealth((cur) => cur - damage)

  useEffect(() => {
    if (health <= 0) setAlive(false)
  }, [hurt])

  useLayoutEffect(() => {
    if (alive)
      createEntity({
        id: ref.current.parent.uuid,
        type: ref.current.parent.name,
        position: ref.current.position,
      })
  }, [alive])

  const position = useRef<THREE.Vector3>(pos)
  const rotation = useRef(r)

  const setPosition = (p: THREE.Vector3) => (position.current = p)

  return [setPosition, alive, health, hurt]
}
