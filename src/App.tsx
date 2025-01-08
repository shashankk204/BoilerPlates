 
import { Route, Routes } from 'react-router'
import './App.css'
import Fetch from './pages/Fetch'
import Home from './pages/Home'
import Layout from './components/Layout'
import FetchUsingButton from './pages/FetchUsingButton'
import Pokemon from './pages/InfiniteScroll'
import PokemonId from './pages/PokemonId'
import Pagination from './pages/Pagination'
import InfiniteQuery from './pages/InfiniteQuery'
import Todo from './pages/Todo'
function App() {
   

  return (
    <>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home></Home>}/>
        <Route path='/pageination' element={<Pagination></Pagination>}></Route>
        <Route path='/InfiniteQ' element={<InfiniteQuery></InfiniteQuery>}></Route>

        <Route path="/fetch" element={<Fetch></Fetch>} />
        <Route path="/fetchusingbutton" element={<FetchUsingButton></FetchUsingButton>} />
        <Route path='/pokemon' element={<Pokemon/>} ></Route>  
        <Route path='/pokemon/:id' element={<PokemonId></PokemonId>}></Route>
          
      </Route>
      <Route path='/todo' element={<Todo/>}></Route>
      
    </Routes>

    </>
  )
}

export default App
