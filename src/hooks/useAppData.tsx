import create from "zustand"

interface StatusStore {
  status: "Ongoing" | "Win" | "Lose"
  setWin: () => void
  setLose: () => void
  points: number
  incrementPoints: () => void
  stars: StarType[]
  collectStar: (id: number) => void
}

type StarType = {
  id: number
  position: [number, number, number]
  collected: boolean
}

const stars = [
  { id: 0, position: [0, 2, 0], collected: false },
  { id: 1, position: [0, 2, 2], collected: false },
]

export const useAppData = create<StatusStore>((set) => ({
  status: "Ongoing",
  setWin: () => set(() => ({ status: "Win" })),
  setLose: () => set(() => ({ status: "Lose" })),
  points: 0,
  stars: stars,
  collectStar: (id: number) =>
    set((state) => ({
      points: state.points + 1,
      stars: state.stars.filter((s) => s.id !== id),
    })),
}))
