import axios from 'axios';
import { PokemonResponse } from '../types/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getid } from '../utils/helper';
import { Link } from 'react-router';
import { PokemonImage } from '../components/ImageCard';



async function fetchfn({ pageParam }: { pageParam: number }) {
  const data = await axios.get<PokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=${pageParam * 20}&limit=20`
  );

  return data.data.results;
}

function InfiniteQuery() {
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['pokemon'],
    queryFn: fetchfn,
    initialPageParam: 0,
    getNextPageParam: (_lastpage, _allpage, page) => {

      if (page == 65) return undefined
      return (page + 1)
    }
  })

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error?.message}</div>;



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
        <div className="h-20 flex justify-center my-6">

          <button
            disabled={!hasNextPage}
            className="m-4 bg-teal-400 px-5 rounded-3xl w-40 disabled:bg-teal-700"
            onClick={() => {
              fetchNextPage()
            }}
          >
            Load More
          </button>
        </div>
      </div>
    </div>
  )
}

export default InfiniteQuery
