import { Header } from './components/Header'
import { Bills } from './pages/Bills'
import { Router } from './Router'
import '/src/styles/global.css'

function App() {
  return (
    <div className="App">
      <Header />
      <div className="flex">
        <Router />
      </div>
    </div>
  )
}

export default App
