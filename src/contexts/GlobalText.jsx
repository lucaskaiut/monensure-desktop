import { AuthContextProvider } from "./AuthContext";

export function GlobalContext ({ children }) {
    return <AuthContextProvider>{ children }</AuthContextProvider>
}