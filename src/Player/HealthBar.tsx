import { Html } from "@react-three/drei"
import { useSpring, animated } from "react-spring"

export default function HealthBar({ health }: { health: number }) {
  const [props] = useSpring(
    () => ({
      from: { width: 80 },
      to: { width: health },
    }),
    [health]
  )

  return (
    <group position={[0, 0.5, 0]}>
      <Html center={true}>
        <div
          style={{
            background: "white",
            width: 80,
            height: 5,
            position: "relative",
          }}
        >
          <animated.div
            style={{
              ...props,
              position: "absolute",
              background: "hotpink",
              top: 0,
              left: 0,

              height: 5,
            }}
          />
        </div>
      </Html>
    </group>
  )
}
