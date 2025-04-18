import { useState } from 'react'
import './Index.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Details from './pages/Details'
import Trending from './pages/Trending'
import Newmovies from './pages/Newmovies'
import NewseriesTv from './pages/NewseriesTv'
import Recommends from './pages/Recommends'
import Recently from './pages/Recently'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element = {<Home />} />
        <Route path="/details/:id/" element = {<Details />} />
        <Route path="/recently" element = {<Recently />} />
        <Route path="/trending" element = {<Trending />} />
        <Route path="/newmovies" element = {<Newmovies />} />
        <Route path="/newseriestv" element = {<NewseriesTv />} />
        <Route path="/recommends" element = {<Recommends />} />
        
      </Routes>
    </div>
  )
}

export default App
