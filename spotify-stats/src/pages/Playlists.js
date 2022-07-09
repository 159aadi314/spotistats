import React from "react";
import { useEffect } from "react";
import { PlaylistsGrid, SectionWrapper } from "../components";
import { getCurrentUserPlaylists } from "../spotify";
import { catchErrors } from "../utils";

const Playlists= ()=>{
    const [playlists, setPlaylists] = React.useState(null);
    useEffect(()=>{
        const fetchData= async ()=>{
            const {data} = await getCurrentUserPlaylists();
            setPlaylists(data);
        }
        catchErrors(fetchData());
    })
    return (
        <main>
        <SectionWrapper title="Playlists" breadcrumb={true} seeAllLink='/playlists'>
            {playlists&& playlists.items&&<PlaylistsGrid playlists={playlists.items}/>}
        </SectionWrapper>
        </main>
    )
}

export default Playlists;
