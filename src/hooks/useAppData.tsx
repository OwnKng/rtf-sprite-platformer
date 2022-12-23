import create from "zustand"

const createStatusStore = (set: any) => ({
  status: "Ongoing",
  setWin: () => set(() => ({ status: "Win" })),
  setLose: () => set(() => ({ status: "Lose" })),
})

interface Entity {
  id: string
  type: string
  status: string
}

interface EntityStore {
  entities: Entity[]
  createEntity: (e: Entity) => void
  deleteEntity: (id: string) => void
  updateEntity: (id: string, status: string) => void
}

const createEntitiesStore = (set: any) => ({
  entities: [],
  createEntity: (entity: Entity) =>
    set((state: EntityStore) => ({ entities: [...state.entities, entity] })),
  deleteEntity: (id: string) =>
    set((state: EntityStore) => ({
      entities: state.entities.filter((e) => e.id !== id),
    })),
  updateEntity: (id: string, status: string) =>
    set((state: EntityStore) => ({
      entities: state.entities.map((e) => (e.id === id ? { ...e, status } : e)),
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
