import { useState,useEffect } from "react";
import { catchErrors } from '../utils'
import { useParams } from "react-router-dom";
import { getTrack } from '../spotify';
import React from 'react';
import { StyledHeader,  } from "../styles";
import { SectionWrapper, ArtistsGrid } from "../components";

const embedStyle={
    borderRadius : '12px',
    marginLeft: '200px',
    alignSelf:'center',
    marginTop: '20px',
};

// const iframeStyle{
//     borderRadius: '12px',
//     alignSelf:'center',
// };

const Track = () =>{
    const { id } = useParams();
    const [track, setTrack] = useState(null);
    const [artists, setArtists] = useState(null);
    useEffect(()=>{
        const fetchData = async () => {
            const { data } = await getTrack(id);

            setTrack(data);
            setArtists(data.artists);
            console.log(data.preview_url);
        }
        catchErrors(fetchData());
    },[])
    
    return (track&& track.name&&
        <>
            <StyledHeader>
                <div className="header__inner">
                {track.album.images && track.album.images[0].url && (
                    <img className="header__img" src={track.album.images[0].url} alt="Track Artwork"/>
                )}
                <div>
                    <div className="header__overline">Track</div>
                    <h2 className="header__name">{track.name}</h2>
                    <p className="header__meta">
                       <span >Popularity: {track.popularity}</span>
                    </p>
                </div>
                </div>
            </StyledHeader>
            <div className="track__inner" style={embedStyle}>
            <iframe title={`track.name`} style={embedStyle} src={`https://open.spotify.com/embed/track/${track.id}?utm_source=generator`} width="50%" height="400" frameBorder="0"  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
            </div>
        </>
    )
}
export default Track;