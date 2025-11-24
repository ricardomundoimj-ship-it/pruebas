import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Cotizador from './pages/Cotizador'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cotizador" element={<Cotizador />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
