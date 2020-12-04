import { Component } from "react";
import firebase from "./fireBase";
import Song from "./Song";

class Results extends Component {
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
            <button
              className={"savePlaylist"}
              onClick={this.props.savePlaylist}
            >
              SAVE PLAYLIST
            </button>
          </div>
        </div>
        <ul>
          {this.props.results.map((songObject, index) => {
            return (
              <Song
                song={songObject}
                index={index}
                removeSong={this.props.removeSong}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Results;
