import { Canvas } from "@react-three/fiber"
import Player from "./Player/Player"
import { KeyboardControls, OrbitControls } from "@react-three/drei"
import { Debug, Physics, RigidBody } from "@react-three/rapier"
import Lava from "./Lava"
import Destination from "./Destination"
import { useAppData } from "./hooks/useAppData"
import Platforms from "./Platform"
import { useEffect, useState } from "react"
import Boundary from "./Boundary"
import MovingPlatform from "./MovingPlatform"
import RotatingPlatforms from "./RotatingPlatforms"
import Stars from "./Stars"

const HudMap = {
  Win: <h1>You win!</h1>,
  Lose: <h1>Game Over</h1>,
  Ongoing: null,
}

export default function App() {
  const status = useAppData((state) => state.status)

  return (
    <>
      <div className='hud'>{HudMap[status]}</div>
      <Canvas shadows>
        <KeyboardControls
          map={[
            { name: "forward", keys: ["ArrowUp", "w", "W"] },
            { name: "backward", keys: ["ArrowDown", "s", "S"] },
            { name: "left", keys: ["ArrowLeft", "a", "A"] },
            { name: "right", keys: ["ArrowRight", "d", "D"] },
            { name: "jump", keys: ["Space"] },
            { name: "run", keys: ["Shift"] },
            { name: "attack", keys: ["k", "K"] },
          ]}
        >
          <Physics>
            <Player />
            <MovingPlatform />
            <MovingPlatform position={[7.5, 1, 2]} length={10} />
            <MovingPlatform
              position={[10, 3.5, -1]}
              length={5}
              direction='y'
              dimensions={[2, 0.1, 2]}
            />
            <MovingPlatform
              position={[1, 7.5, 1]}
              length={5}
              direction='y'
              dimensions={[1, 0.1, 2]}
            />
            <MovingPlatform
              position={[0.5, 12.5, 9]}
              length={5}
              direction='y'
              dimensions={[3, 0.1, 2]}
            />
            <MovingPlatform
              position={[0.5, 15, 6]}
              length={2}
              direction='z'
              dimensions={[3, 1, 0.1]}
            />
            <MovingPlatform
              position={[5, 15, 4]}
              length={2}
              direction='x'
              dimensions={[0.1, 1, 3]}
            />
            <MovingPlatform
              position={[5, 15, 1]}
              length={2}
              direction='x'
              dimensions={[0.1, 1, 3]}
            />
            <RotatingPlatforms />
            <Platforms />
            <Boundary />
            <Destination position={[5, 15, -4]} />
            <Stars />
          </Physics>
        </KeyboardControls>
      </Canvas>
    </>
  )
}
