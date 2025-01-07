import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router"
import { PokemonById } from "../types/PokemonById";
import BarGraph from "../components/BarGraph";


async function GetPokemonById(id: string) {
  const { data } = await axios.get<PokemonById>(`https://pokeapi.co/api/v2/pokemon/${id}/`);

  return data;
}

function getZeros(id: string) {
  let ans = "";
  for (let i = 0; i < (4 - id.length); i++) {
    ans += '0';
  }
  return ans;
}

function PokemonId() {

  const { id } = useParams()
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => { return GetPokemonById(id || "") }
  })
  if (isLoading) return <div>loading....</div>
  if (isError) return <div>{error.message}</div>

  const zeropad = getZeros(data?.id.toString() || "");

  return (
    <div className="md:flex md:flex-col md:mx-40 md:my-11">
      <div className="text-4xl capitalize text-center">
        {data?.name} <span className="text-zinc-500"> #{zeropad}{data?.id} </span>
      </div>
      <div className="md:flex">
        <div className="bg-slate-100 md:w-5/12 flex justify-center items-center">
          <div className="size-64 flex justify-center items-center">
            <img draggable={false} src={data?.sprites.other?.dream_world.front_default || data?.sprites.other?.["official-artwork"].front_default ||data?.sprites.front_default ||"https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg"} alt="" />
          </div>
        </div>
        <div className="md:w-7/12 flex justify-center" >
          <div className="grid grid-cols-2 bg-blue-400 rounded-xl md:mx-20 mt-5 py-7 md:py-0 w-full items-center justify-center ">
            <div className="mx-10 mt-2 items-center">
              <div className="font-bold text-lg">Height</div>
              <div>{data?.height}</div>
            </div>
            <div className="mx-10 mt-2 items-center">
              <div className="font-bold text-lg">weight</div>
              <div>{data?.weight}</div>
            </div>
            <div className="mx-10 mt-2 items-center">
              <div className="font-bold text-lg">Base Expirence</div>
              <div>{data?.base_experience}</div>
            </div>
            {(data?.abilities) ? <div className="mx-10 mt-2">
              <div className="font-bold text-lg">Abilites</div>
              <div>{data.abilities.map((e) => { return (e.is_hidden) ? null : <div key={e.ability.url}>{e.ability.name}</div> })}</div>
            </div> : <></>}

          </div>
        </div>
      </div>
      <div className="md:flex">
        <div className="0 md:w-5/12 mt-5">
          <div className="text-lg text-center font-bold">
            Stats
          </div>
          {/* <div>
            {data?.stats.map((e) => {
              return (
                 
                  <div key={e.stat.url} className="">
                    {e.stat.name} : {e.base_stat}
                  </div>
                
              )
            })}
          </div> */}
          <BarGraph stats={data?.stats||[]}></BarGraph>

        </div>
        <div className="px-20 mt-5 md:w-7/12" >
          <div className="text-lg text-center md:text-start  font-bold">
            Type:
          </div>
          <div className="flex text-center p-5 ">
            {data?.types.map((e)=>{
              return (
                <div key={e.slot} className="bg-orange-500 w-20 h-7 mx-1 rounded-2xl pb-2 px-2">
                  {e.type.name}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default PokemonId

