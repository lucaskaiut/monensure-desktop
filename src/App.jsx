import { AuthContextProvider } from './contexts/AuthContext'
import { Toaster } from 'react-hot-toast'
import { Router } from './Router'
import '/src/styles/global.css'

function App() {
  return (
    <div className="App">
      
      <div className="flex">
        <AuthContextProvider>
          <Router />
          <Toaster toastOptions={{
            error: {
              style: {
                background: '#e52e4d',
                color: '#fff'
              },
            },
          }}/>
        </AuthContextProvider>
      </div>
    </div>
  )
}

export default App
