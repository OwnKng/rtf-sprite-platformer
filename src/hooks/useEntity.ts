import {
  Ref,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import * as THREE from "three"
import { useAppData } from "./useAppData"

export const useEntity = (ref: Ref<THREE.Mesh | THREE.Sprite>) => {
  const [createEntity, updateEntity] = useAppData((state) => [
    state.createEntity,
    state.updateEntity,
  ])

  const [alive, setAlive] = useState(true)
  const [health, setHealth] = useState(100)

  const hurt = (damage: number) => setHealth((cur) => cur - damage)

  const broadcast = useCallback(
    (status: string) => updateEntity(ref.current.parent.uuid, status),
    []
  )

  useEffect(() => {
    if (health <= 0) setAlive(false)
  }, [hurt])

  useLayoutEffect(() => {
    if (alive)
      createEntity({
        id: ref.current.parent.uuid,
        type: ref.current.parent.name,
      })
  }, [alive])

  return [broadcast, alive, health, hurt, status]
}
