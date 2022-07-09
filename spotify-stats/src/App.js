import { useState, useEffect } from 'react';
import { AccessToken, logout} from './spotify';
// import styled from 'styled-components';
import {Login,Profile, TopArtists, TopTracks, Playlists} from './pages';
import React  from 'react';
// import { catchErrors } from './utils';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import { GlobalStyle } from './styles';
import styled from 'styled-components';

const StyledLogoutButton = styled.button`
  position: absolute;
  top: var(--spacing-sm);
  right: var(--spacing-md);
  padding: var(--spacing-xs) var(--spacing-sm);
  background-color: rgba(0,0,0,.7);
  color: var(--white);
  font-size: var(--fz-sm);
  font-weight: 700;
  border-radius: var(--border-radius-pill);
  z-index: 10;
  @media (min-width: 768px) {
    right: var(--spacing-lg);
  }
`;

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}


function App() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(AccessToken);

    
  }, []);

  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
               {!token ? (
          <Login />
        ) : (
          <>
          <StyledLogoutButton onClick={logout}>Logout</StyledLogoutButton>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route path="/top-artists" element={<TopArtists/>} />
              <Route path="/top-tracks" element={<TopTracks/>} />
              <Route path="/playlists/:id" element={<h1>Playlist</h1>} />
              <Route path="/playlists" element={<Playlists />} />
                
              <Route path="/" element={
                <Profile/>
                }
             />
            </Routes>
          </Router>
          </>
        )}
      </header>
    </div>
    
  );
}

export default App;