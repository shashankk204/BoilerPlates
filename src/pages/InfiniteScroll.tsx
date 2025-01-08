import axios from "axios";
import { PokemonResponse } from "../types/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { PokemonImage } from "../components/ImageCard";
import { getid } from "../utils/helper";
import { Link } from "react-router";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

async function fetchfn({pageParam}:{pageParam:number}) {
  // await new Promise((res)=>{
  //   setTimeout(()=>{res(100)},5000)
  // })
  const data = await axios.get<PokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam * 20}&limit=20`
  );

  return data.data.results;
}

function Pokemon() {
  const { ref, inView } = useInView();
  const {data,isLoading,isError,error,fetchNextPage,hasNextPage,isFetchingNextPage}=useInfiniteQuery({
    // @ts-ignore
    initialData:null,
    queryKey:['pokemon'],
    queryFn:fetchfn,
    initialPageParam:0,
    getNextPageParam:(_lastpage,_allpage,page)=>{
        
        if(page==65) return undefined
        return(page+1)
    }
})

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error?.message}</div>;

  useEffect(()=>{
    if(hasNextPage && inView)
    {
      fetchNextPage()
    }
  },[inView])

  return (
    <div>
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-24">
        {data?.pages.map((page) => {
          return page.map(({ name, url }) => {
            return (
              <Link to={`/pokemon/${getid(url)}`} key={url}>
                <div className="flex flex-col m-3 h-full">
                  <div className="flex justify-center items-center h-full bg-slate-100 overflow-hidden">
                    {/* Custom Image Component */}
                    <PokemonImage imageUrl={getid(url)} />
                  </div>
                  <div key={url} className="text-center text-2xl font-bold">
                    {name}
                  </div>
                </div>
              </Link>
            );
          })
        })
        }

      </div>
      {(isFetchingNextPage)?<div className="text-center text-3xl font-bold">
        {"loading....."}
      </div>:<></>}
      <div ref={ref}></div>
    </div>
  </div>
  )
}

export default Pokemon
