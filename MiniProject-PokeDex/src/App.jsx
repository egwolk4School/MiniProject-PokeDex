import { Dex,PokeDetail, About,Contact } from './Components/Pages'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Footer, Header } from './Components'
function App() {
  return (
    <>
      <Header/>
      <main>
      <Routes>
        <Route path='/' element={<Dex/>}/>
        <Route path='/pokemon/:id' element={<PokeDetail/>}/>
        <Route path='/Contact' element={<Contact/>}/>
        <Route path='/About'element={<About/>}/>
      </Routes>
      </main>
      <Footer/>
    </>
  )
}

export default App
