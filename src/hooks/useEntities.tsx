import { useContext } from "react"
import { EntitiesContext } from "./EntitiesProvider"

export const useEntities = () => useContext(EntitiesContext)
