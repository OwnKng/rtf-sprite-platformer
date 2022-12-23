import create from "zustand"

interface StatusStore {
  status: "Ongoing" | "Win" | "Lose"
  setWin: () => void
  setLose: () => void
}

export const useAppData = create<StatusStore>((set) => ({
  status: "Ongoing",
  setWin: () => set(() => ({ status: "Win" })),
  setLose: () => set(() => ({ status: "Lose" })),
}))
