import { Component } from "react";
import firebase from "./fireBase";
import Song from "./Song";

class Results extends Component {
  constructor() {
    super();
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    this.setState({
      results: this.props.results,
    });
  }

  savePlaylist = () => {
    const dbRef = firebase.database().ref();
    dbRef.push(this.state.results);
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

  render() {
    return (
      <div className="Results" id="Results">
        <div className="secondHeading">
          <div className>
            <p>Similar songs to</p>
            <h2>{this.props.searchSong}</h2>
            <h3>
              <span>by</span> {this.props.searchArtist}
            </h3>
            <button onClick={this.savePlaylist}>Save the playlist</button>
          </div>
        </div>
        <ul>
          {this.state.results.map((songObject, index) => {
            return (
              <Song
                song={songObject}
                index={index}
                removeSong={this.removeSong}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Results;
