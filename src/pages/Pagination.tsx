import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PokemonResponse } from '../types/types';
import { getid } from '../utils/helper';
import { Link, useSearchParams } from 'react-router';
import { PokemonImage } from '../components/ImageCard';

async function fetchfn(page: number) {
  const data = await axios.get<PokemonResponse>(
    `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
  );
  return data.data.results;
}

function Pagination() {
  const [SearchParams, SetSearchParam] = useSearchParams();

  function SetSearchQuery(page: number) {
    const newquery = new URLSearchParams(SearchParams);
    newquery.set('offset', page.toString());
    SetSearchParam(newquery);
  }

  const [Page, SetPage] = useState(Number(SearchParams.get('offset')) || 0);

  const { data, isError, isLoading, error } = useQuery({
    initialData:null,
    queryKey: ['pokemons', Page],
    queryFn: () => fetchfn(Page),
    // placeholderData: keepPreviousData,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>{error?.message}</div>;
  
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, [Page]);



  return (
    <div>
      <div className="grid grid-cols-4 gap-y-24">
        {data?.map(({ name, url }) => {
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
        })}
      </div>
      <div className="h-20 flex justify-center my-6">
        <button
          disabled={!(Page > 0)}
          className="m-4 bg-teal-400 px-5 rounded-3xl w-40 disabled:bg-teal-700"
          onClick={() => {
            SetPage((prev) => prev - 1);
            SetSearchQuery(Page - 1);
          }}
        >
          Prev
        </button>
        <button
          disabled={(data?.length || 0) < 20}
          className="m-4 bg-teal-400 px-5 rounded-3xl w-40 disabled:bg-teal-700"
          onClick={() => {
            SetPage((prev) => prev + 1);
            SetSearchQuery(Page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}



export default Pagination;
