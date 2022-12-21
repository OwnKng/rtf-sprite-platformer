import { useFrame } from "@react-three/fiber"
import json from "./ninja.json"
import { useAseprite } from "./hooks/useAseprite"
import { useKeyboardControls } from "@react-three/drei"
import { forwardRef, useRef } from "react"

type Direction = "North" | "South" | "East" | "West"
type Action = "Idle" | "Walk" | "Run" | "AttackA"

const Sprite = forwardRef<THREE.Sprite, any>((props, ref) => {
  const direction = useRef<Direction>("South")
  const action = useRef<Action>("Idle")

  const t = useRef<number>(0)
  const attacking = useRef<boolean>(false)

  const [texture, setFrame] = useAseprite("ninja.png", json, "IdleSouth", false)
  const [, get] = useKeyboardControls()

  const setDirection = (d: Direction) => (direction.current = d)
  const setAction = (a: Action) =>
    !attacking.current ? (action.current = a) : null

  const setAttack = () => (action.current = "AttackA")

  const resetAttack = () => {
    attacking.current = false
    t.current = 0
  }

  const walkTowards = (d: Direction) => {
    setDirection(d)
    setAction("Walk")
  }

  useFrame((_, delta) => {
    if (attacking.current) {
      t.current += delta * 1000
      if (t.current > 69 * 6) resetAttack()
      return
    }

    const { forward, backward, left, right, run, attack } = get()

    if (forward) walkTowards("North")
    if (backward) walkTowards("South")
    if (right) walkTowards("East")
    if (left) walkTowards("West")

    if (attack) {
      attacking.current = true
      setAttack()
    }

    if (run) setAction("Run")

    if (!forward && !backward && !left && !right && !attack) setAction("Idle")

    setFrame(`${action.current}${direction.current}`)
  })

  return (
    <sprite ref={ref} {...props}>
      <spriteMaterial map={texture} />
    </sprite>
  )
})

export default Sprite
