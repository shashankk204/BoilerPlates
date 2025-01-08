import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getid } from '../utils/helper';
import { Link } from 'react-router';
import { PokemonResponse } from '../types/types';


function Fetch() {
  async function fetchpokeon() {
    // await new Promise((resolve)=>{
    //     setTimeout(()=>{
    //             resolve(true);
    //     },5000)
    // })
    const data = await axios.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon/");
    const pok = data.data.results;
    return pok;
  }
  // fetchpokeon();
  const { data, isLoading, isError, error, isFetching } = useQuery({
    initialData:null,
    queryKey: ["pokemon"],
    queryFn: fetchpokeon,
    // staleTime:3000, //for the first time fetch will be called and then after futher request for 3sec cached data will be displayed and after the value will be revalidated 
    // refetchInterval:3000 // polling will be done at the inteval of 3 sec
    // refetchIntervalInBackground:true //as the name suggested
  })

  //data is first fetched from the cache then a background fetch will occur

  

  if (isLoading || !data) return <div> loading</div>

  if (isError) return <div>{error.message}</div>
  return (
    <div>
      <div className='grid grid-cols-4 gap-y-24'>
        {data?.map(({ name, url }) => {
          return (
            <Link to={`/pokemon/${getid(url)}`} key={url}>

              <div className='  flex flex-col m-3  h-full' key={url}>

                <div className='flex justify-center items-center h-full bg-slate-100'>
                  <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getid(url)}.svg`} alt="" className="max-h-auto" />

                </div>
                <div key={url} className='text-center text-3xl font-bold'>{name}</div>
              </div>
            </Link>
          )
        })}

      </div>
    </div>
  )
}

export default Fetch
