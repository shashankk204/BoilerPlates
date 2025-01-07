import { Link, Outlet } from 'react-router'
import PokemonSvg from '../assets/16.svg'
function Layout() {
  return (
    <div>
      <div className=' md:flex md:h-16  items-center bg-slate-300 sticky top-0 z-10 overflow-hidden hidden '>
        <div className='py-5  px-6 w-2/12 items-center '>
            <Link to='/' className='px-8 '><img src={PokemonSvg} alt='' className='size-40 mt-3'></img></Link>  
        </div>
        <div className='flex justify-evenly w-10/12'>
            <div>

            <Link to={'/fetch'}>fetch</Link>
            </div>
            <div>
            <Link to={'/pageination'}>Pagination</Link>
            
            </div>
            <div>
            <Link to={'/InfiniteQ'}>InfniteQWButton</Link>
            
            </div>
            <div>
            <Link to={'/fetchusingbutton'}>fetchusingbutton</Link>
            
            </div>
            <div>
            <Link to={'/pokemon'}>pokemon</Link>
            
            </div>
        </div>   
      </div>
      <div className='md:hidden sticky top-0 flex justify-center bg-slate-300  overflow-hidden h-20'><Link to={'/pokemon'}><img src={PokemonSvg} className='w-48 h-64 pb-20 -my-10'/></Link></div>
        <Outlet></Outlet>

    </div>
  )
}

export default Layout
