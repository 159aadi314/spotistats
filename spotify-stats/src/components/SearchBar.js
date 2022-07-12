// import react from 'react';
import './searchbar.css';
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import {SectionWrapper} from '../components';
import {TrackList} from '../components';
import { PlaylistsGrid } from '../components';
const SearchBar = () => {
    const [data,setData]=useState(null);
    const [playlist, setPlaylist] = useState(null);
    const handleChange= async (e)=>{
        const search=e.target.value;
        if(search.length>=3){
            const searchresult=await axios.get(`/search?q=${search}&type=track`);
            setData(searchresult.data.tracks);
            // console.log(data);
            const playlistresult=await axios.get(`/search?q=${search}&type=playlist`);
            setPlaylist(playlistresult.data.playlists);
            console.log(playlistresult.data.playlists);
        }
        else
        {
            setData(null);
            setPlaylist(null);
        }
        
    }

    return (
        <>
        
        <div className="search-bar" >   
        {/**align the searchbar to center */}
            <a href='/' style={{paddingLeft:'20px', fontSize: '20px'}}>Home</a>
        
                <input type="text" placeholder="Search for tracks/playlists" onChange={handleChange} />
            
        

        </div>
        {data&&
        <SectionWrapper title="Tracks" seeAllLink="/top-tracks">
            <TrackList tracks={data.items.slice(0, 5)} />
        </SectionWrapper>}
        {playlist&&<SectionWrapper title="Playlists" seeAllLink="/playlists">
            <PlaylistsGrid playlists={playlist.items.slice(0, 5)} />
          </SectionWrapper>}
      </>
    );
}
export default SearchBar;
    