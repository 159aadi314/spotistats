import { useState, useEffect } from 'react';
import { getTopTracks } from '../spotify';
import { catchErrors } from '../utils';
import { SectionWrapper, TrackList } from '../components';
import React from 'react';


const TopTracks = () => {
  const [topTracks, setTopTracks] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getTopTracks();
      setTopTracks(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <main>
      <SectionWrapper title="Top Tracks" breadcrumb={true}>

        {topTracks && topTracks.items && (
          <TrackList tracks={topTracks.items} />
        )}
      </SectionWrapper>
    </main>
  );
};

export default TopTracks;