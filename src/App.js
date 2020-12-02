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
      results: [],
      choiceMade: false,
      savedPlaylists: "",
      showSavedPlaylists: false,
    };
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    dbRef.on("value", (response) => {
      const dataObject = response.val();
      const savedPlaylistsArray = [];
      for (let playlist in dataObject) {
        savedPlaylistsArray.push(dataObject[playlist]);
      }

      this.setState({
        savedPlaylists: savedPlaylistsArray,
      });
    });
  }

  getResults = (artist, song) => {
    axios({
      url: "http://ws.audioscrobbler.com/2.0/",
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

  savePlaylist = () => {
    const dbRef = firebase.database().ref();
    dbRef.push(this.state.results);
  };

  showSavedPlaylists = () => {
    document.querySelector(".wrapper").classList.add("animated");
    setTimeout(() => {
      this.setState({
        showSavedPlaylists: true,
      });
    }, 500);
  };

  hideSavedPlaylists = () => {
    console.log("hide");
    this.setState({
      showSavedPlaylists: false,
    });
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
            <button onClick={this.savePlaylist}>Save playlist</button>
            <SearchSection getResults={this.getResults} />
            <div className="sectionsControl">
              <button className="search" onClick={this.hideSavedPlaylists}>
                Search
              </button>
              <button
                className="showSavedPlaylist"
                onClick={this.showSavedPlaylists}
              >
                Saved Playlist
              </button>
            </div>
          </header>

          {this.state.choiceMade && !this.state.showSavedPlaylists ? (
            <Results
              results={this.state.results}
              searchSong={this.state.searchSong}
              searchArtist={this.state.searchArtist}
            />
          ) : (
            this.state.showSavedPlaylists && (
              <SavedPlaylists savedPlaylists={this.state.savedPlaylists} />
            )
          )}
        </div>
      </div>
    );
  }
}

export default App;
