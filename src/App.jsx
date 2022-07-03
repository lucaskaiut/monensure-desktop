import { AuthContextProvider } from './contexts/AuthContext'
import { Router } from './Router'
import '/src/styles/global.css'

function App() {
  return (
    <div className="App">
      
      <div className="flex">
        <AuthContextProvider>
          <Router />
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App
