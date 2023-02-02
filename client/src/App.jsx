import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SingleItem from './pages/protected/SingleItem';
import Items from './pages/protected/Items';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/item" element={<Items />} />
          <Route path="/item/:id" element={<SingleItem />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
