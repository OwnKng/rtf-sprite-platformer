import create from "zustand"

interface StatusStore {
  status: "Ongoing" | "Win" | "Lose"
  setWin: () => void
  setLose: () => void
  points: number[]
  coins: CoinType[]
  collectCoin: (id: number) => void
}

type Triple = [number, number, number]

type CoinType = {
  id: number
  position: Triple
  collected: boolean
}

const coins: CoinType[] = [
  // Level one
  { id: 0, position: [-2, 2, 0], collected: false },
  { id: 1, position: [-2, 4, 1], collected: false },
  { id: 2, position: [-3, 4, 1], collected: false },
  { id: 3, position: [1, 3, -1], collected: false },
  { id: 4, position: [2, 3, -1], collected: false },
  { id: 5, position: [3, 3, -1], collected: false },
  { id: 6, position: [5, 2, 1], collected: false },
  { id: 7, position: [6, 2, 2], collected: false },
  { id: 8, position: [7, 2, 3], collected: false },
  // Level two
  { id: 9, position: [4, 6, 1], collected: false },
  { id: 10, position: [5, 6, 1], collected: false },
  { id: 11, position: [6, 6, 1], collected: false },
  { id: 12, position: [7, 6, 1], collected: false },
  // Level three
  { id: 13, position: [-2, 11, 1], collected: false },
  { id: 14, position: [5, 11, 1], collected: false },
  { id: 15, position: [6, 11, 1], collected: false },
  { id: 16, position: [7, 11, 1], collected: false },
  { id: 17, position: [10, 11, 7], collected: false },
  { id: 18, position: [11, 11, 7], collected: false },
  { id: 19, position: [9, 11, 11], collected: false },
  { id: 20, position: [8, 11, 11], collected: false },
  { id: 21, position: [7, 11, 11], collected: false },
  { id: 22, position: [8, 11, 11], collected: false },
  { id: 23, position: [-1, 11, 11], collected: false },
  { id: 24, position: [0, 11, 11], collected: false },
  { id: 25, position: [1, 11, 11], collected: false },
  // level four
  { id: 26, position: [6, 16, 0], collected: false },
  { id: 27, position: [5, 16, 1], collected: false },
  { id: 28, position: [5, 16, 2], collected: false },
]

export const useAppData = create<StatusStore>((set) => ({
  status: "Ongoing",
  setWin: () => set(() => ({ status: "Win" })),
  setLose: () => set(() => ({ status: "Lose" })),
  points: [],
  coins: coins,
  collectCoin: (id: number) =>
    set((state) => ({
      points: state.points.includes(id)
        ? state.points
        : state.points.concat(id),
      coins: state.coins.filter((c) => c.id !== id),
    })),
}))
