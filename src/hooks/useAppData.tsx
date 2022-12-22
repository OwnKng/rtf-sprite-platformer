import create from "zustand"

const createStatusStore = (set: any) => ({
  status: "Ongoing",
  setWin: () => set(() => ({ status: "Win" })),
  setLose: () => set(() => ({ status: "Lose" })),
})

interface Entity {
  id: string
  type: string
}

interface EntityStore {
  entities: Entity[]
  createEntity: (e: Entity) => void
  deleteEntity: (id: string) => void
}

const createEntitiesStore = (set: any) => ({
  entities: [],
  createEntity: (entity: Entity) =>
    set((state) => ({ entities: [...state.entities, entity] })),
  deleteEntity: (id: string) =>
    set((state) => ({
      entities: state.entities.filter((e: Entity) => e.id !== id),
    })),
})

interface StatusStore {
  status: "Ongoing" | "Win" | "Lose"
  setWin: () => void
  setLose: () => void
}

export const useAppData = create<StatusStore & EntityStore>((...a) => ({
  //@ts-ignore
  ...createStatusStore(...a),
  ...createEntitiesStore(...a),
}))
