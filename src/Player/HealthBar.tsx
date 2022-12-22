import { Html } from "@react-three/drei"
import { useSpring, animated } from "react-spring"

export default function HealthBar({ health }: { health: number }) {
  const [props, api] = useSpring(
    () => ({
      from: { width: 100 },
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
            width: "100px",
            height: 10,
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
              height: 10,
            }}
          />
        </div>
      </Html>
    </group>
  )
}
