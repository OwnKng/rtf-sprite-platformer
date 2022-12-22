import { useContext } from "react"
import { StatusContext } from "./StatusProvider"

export const useStatus = () => useContext(StatusContext)
