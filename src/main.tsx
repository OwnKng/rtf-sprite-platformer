import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import EntitiesProvider from "./hooks/EntitiesProvider"
import StatusProvider from "./hooks/StatusProvider"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EntitiesProvider>
      <StatusProvider>
        <App />
      </StatusProvider>
    </EntitiesProvider>
  </React.StrictMode>
)
