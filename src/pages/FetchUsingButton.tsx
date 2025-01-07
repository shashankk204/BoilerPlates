import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import React from 'react'
import { getid } from '../utils/helper';
import { PokemonResponse } from '../types/types';



function FetchUsingButton() {

    async function fetchlogic() {
        // await new Promise((resolve)=>{
        //     setTimeout(()=>{
        //             resolve(true);
        //     },5000)
        // })
        const data = await axios.get<PokemonResponse>("https://pokeapi.co/api/v2/pokemon/");
        const pok = data.data.results;
        return pok;
    }

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["pokemons"],
        queryFn: fetchlogic,
        enabled: false
    })

    if (isLoading) return <div> loading</div>

    if (isError) return <div>{error.message}</div>

    return (
        <div >

            <div className='grid grid-cols-4 gap-y-24'>
                {data?.map(({ name, url }) => {
                    return(

                        <div className='  flex flex-col m-3 '>
                            
                            <div className='flex justify-center items-center h-full bg-slate-100'>
                                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${getid(url)}.svg`} alt="" className="max-h-auto  " />

                            </div>
                            <div key={url} className='text-center text-3xl font-bold'>{name}</div>
                        </div>
                    ) 
                })}
                
            </div>

            <button onClick={() => { refetch() }}>fetch data</button>
        </div>
    )
}

export default FetchUsingButton
