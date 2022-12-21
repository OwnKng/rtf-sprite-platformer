import { RigidBodyApi } from "@react-three/rapier"
import * as THREE from "three"

export const calculateIdealOffset = (target: RigidBodyApi) =>
  new THREE.Vector3(0, 2, 3)
    .applyQuaternion(target.rotation())
    .add(target.translation())

export const calculateIdealLookAt = (target: RigidBodyApi) =>
  target.translation()
