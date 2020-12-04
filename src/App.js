import "./App.scss";
import axios from "axios";
import heroImage from "./assets/heroImage.svg";
import { Component } from "react";
import SearchSection from "./SearchSection";
import Results from "./Results";
import firebase from "./fireBase";
import SavedPlaylists from "./SavedPlaylists";

class App extends Component {
  constructor() {
    super();

    this.state = {
      results: "",
      choiceMade: false,
      savedPlaylists: "",
      savedPlaylistsIds: "",
      showSavedPlaylists: false,
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const dataObject = response.val();
      const savedPlaylistsArray = [];
      const savedPlaylistsIds = [];
      for (let playlist in dataObject) {
        savedPlaylistsArray.push(dataObject[playlist]);
        savedPlaylistsIds.push(playlist);
      }

      this.setState({
        savedPlaylists: savedPlaylistsArray,
        savedPlaylistsIds: savedPlaylistsIds,
      });
    });
  }

  getResults = (artist, song) => {
    axios({
      url: "https://ws.audioscrobbler.com/2.0/",
      responseType: "json",
      method: "GET",
      params: {
        api_key: "f2cbf10980829c7ad5837d9b944630f5",
        track: song,
        artist: artist,
        method: "track.getsimilar",
        format: "json",
      },
    }).then((data) => {
      const cleanResults = data.data.similartracks.track
        .map((songObject) => {
          return {
            artist: songObject.artist.name,
            name: songObject.name,
            mbid: songObject.mbid ? songObject.mbid : null,
            playcount: songObject.playcount,
          };
        })
        .filter((songObject, index) => {
          if (index < 21) {
            return songObject;
          }
        });

      cleanResults.unshift({
        artist: artist,
        name: song,
        mbid: song,
      });

      this.setState({
        results: cleanResults,
        searchSong: song,
        searchArtist: artist,
        choiceMade: true,
      });
    });
  };

  removeSong = (index, e) => {
    const songElement = e.target.parentElement.parentElement;
    songElement.classList.add("removeSong");

    setTimeout(() => {
      const oldResults = [...this.state.results];
      oldResults.splice(index, 1);
      this.setState({
        results: oldResults,
      });
    }, 200);
  };

  showSavedPlaylists = (e) => {
    e.target.classList.add("activeButton");
    e.target.previousSibling.classList.remove("activeButton");
    document.querySelector(".wrapper").classList.add("animated");

    setTimeout(() => {
      this.setState({
        showSavedPlaylists: true,
      });
    }, 500);
  };

  hideSavedPlaylists = (e) => {
    e.target.classList.add("activeButton");
    e.target.nextSibling.classList.remove("activeButton");

    this.setState({
      showSavedPlaylists: false,
    });
  };

  savePlaylist = () => {
    const dbRef = firebase.database().ref();
    dbRef.push(this.state.results);
  };

  removePlaylist = (playlistId) => {
    const dbRef = firebase.database().ref();
    dbRef.child(playlistId).remove();
  };

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <header>
            <img
              className="heroImage"
              src={heroImage}
              alt="cartoonish girl listening to the music"
            />
            <h1>Find similar songs</h1>
            <SearchSection getResults={this.getResults} />
            <div className="sectionsControl">
              <button className="showResults" onClick={this.hideSavedPlaylists}>
                RESULTS
              </button>
              <button
                className="showSavedPlaylists"
                onClick={this.showSavedPlaylists}
              >
                SAVED
              </button>
            </div>
          </header>

          {this.state.choiceMade && !this.state.showSavedPlaylists ? (
            <Results
              results={this.state.results}
              searchSong={this.state.searchSong}
              searchArtist={this.state.searchArtist}
              removeSong={this.removeSong}
              savePlaylist={this.savePlaylist}
            />
          ) : (
            this.state.showSavedPlaylists && (
              <SavedPlaylists
                savedPlaylists={this.state.savedPlaylists}
                savedPlaylistsIds={this.state.savedPlaylistsIds}
                removePlaylist={this.removePlaylist}
              />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
