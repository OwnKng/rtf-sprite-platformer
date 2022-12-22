import { createContext, ReactNode, useRef, useState } from "react"

type StatusType = "Win" | "Lose" | "Ongoing"

interface StatusContextType {
  status: StatusType
  setWin: () => void
  setGameOver: () => void
  points: number
  incrementPoints: () => void
}

export const StatusContext = createContext(null!)

export default function StatusProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<StatusType>("Ongoing")
  const [points, setPoints] = useState<number>(0)

  const setWin = () => setStatus("Win")
  const setGameOver = () => setStatus("Lose")

  const incrementPoints = () => setPoints((point) => point++)

  return (
    <StatusContext.Provider
      value={{
        status,
        setWin,
        setGameOver,
        points,
        incrementPoints,
      }}
    >
      {children}
    </StatusContext.Provider>
  )
}
