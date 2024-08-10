import React, {useState} from "react";
import styles from "./App.module.css";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import SearchBar from "../SearchBar/SearchBar";
import { Spotify } from "../../util/Spotify";

function App () {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("Exmaple Playlist Name 1");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [showConfirmaion, setShowConfirmation] = useState(false);

  function addTrack(track) {
    const existingTrack = playlistTracks.find((t) => t.id === track.id);
    const newTrack = playlistTracks.concat(track);
    if (existingTrack) {
      console.log("Track is already in the playlist")
    } else {
      setPlaylistTracks(newTrack);
    }
  };

  function removeTrack(track) {
    const existingTrack= playlistTracks.filter((t) => t.id !== track.id);
    setPlaylistTracks(existingTrack);
  };

  function updatePlaylistName(name) {
    setPlaylistName(name);
  };

  function savePlaylist() {
    const trackURIs = playlistTracks.map(t => t.uri);
    Spotify.savePlaylist(playlistName, trackURIs).then(() => {
      setPlaylistName("New PLaylist")
      setPlaylistTracks([]);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3500);
    });
  };

  function search(term) {
    Spotify.search(term).then((result) => setSearchResults(result));
    console.log(term);
  };

    return (
        <div>
        <h1>
          Ja<span className={styles.highlight}>mmm</span>ing
        </h1>
        <div className={styles.App}>
          {/* <!-- Add a SearchBar component --> */}
          <SearchBar onSearch={search} />
          <div className={styles['App-playlist']}>
            {/* <!-- Add a SearchResults component --> */}
            <SearchResults userSearchResults={searchResults} onAdd={addTrack} />
            <Playlist 
              playlistName={playlistName} 
              playlistTracks={playlistTracks} 
              onRemove={removeTrack} 
              onNameChange={updatePlaylistName} 
              onSave={savePlaylist}
              />
              <div>
                {showConfirmaion && (
                  <div className={styles.confirmationMessage}>
                    Playlist successfully saved to your profile!
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
        );
}

export default App;