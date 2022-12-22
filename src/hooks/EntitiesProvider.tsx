import { createContext, ReactNode, useRef, useState } from "react"
import * as THREE from "three"

interface Entity {
  id: string
  type: string
  position: THREE.Vector3
}

interface EntitiesContextType {
  entities: Entity[]
  createEntity: (e: Entity) => void
}

export const EntitiesContext = createContext<EntitiesContextType>(null!)

export default function EntitiesProvider({
  children,
}: {
  children: ReactNode
}) {
  const [entities, setEntities] = useState<Entity[]>([])

  const createEntity = (e: Entity) =>
    setEntities((currentVal) => currentVal.concat(e))

  const getEntitiesByName = (t: string) =>
    entities.filter((entity) => entity.type === t)

  return (
    <EntitiesContext.Provider
      value={{
        entities: entities,
        createEntity,
      }}
    >
      {children}
    </EntitiesContext.Provider>
  )
}
