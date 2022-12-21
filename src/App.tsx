import { Canvas } from "@react-three/fiber"
import Player from "./Player"
import { KeyboardControls } from "@react-three/drei"
import { Physics, RigidBody } from "@react-three/rapier"

export default function App() {
  return (
    <Canvas>
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
          <RigidBody type='fixed'>
            <mesh position={[-2, 1, 0]}>
              <boxGeometry args={[5, 0.1, 2]} />
              <meshBasicMaterial wireframe={true} color='white' />
            </mesh>
            <mesh position={[2, 2, -1]}>
              <boxGeometry args={[5, 0.1, 2]} />
              <meshBasicMaterial wireframe={true} color='white' />
            </mesh>
            <mesh position={[-1, 3, 1]}>
              <boxGeometry args={[5, 0.1, 2]} />
              <meshBasicMaterial wireframe={true} color='white' />
            </mesh>
            <mesh>
              <boxGeometry args={[100, 0.1, 100]} />
              <meshBasicMaterial wireframe={true} color='white' />
            </mesh>
          </RigidBody>
        </Physics>
      </KeyboardControls>
    </Canvas>
  )
}
