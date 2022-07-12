import { useState, useEffect } from 'react';
import { getTopArtists } from '../spotify';
import { catchErrors } from '../utils';
import { ArtistsGrid, SearchBar, SectionWrapper} from '../components';
import React from 'react';
const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopArtists();
      console.log(data);
      setTopArtists(data);
    };

    catchErrors(fetchData());
  },[]);

  return (
    <main>
      <SearchBar/>
      <SectionWrapper title="Top Artists" breadcrumb={true}>

        {topArtists && topArtists.items && (
          <ArtistsGrid artists={topArtists.items} />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopArtists;