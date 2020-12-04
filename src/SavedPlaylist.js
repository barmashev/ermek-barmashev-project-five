import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Component } from "react";
import Song from "./Song";

class SavedPlaylist extends Component {
  constructor() {
    super();
    this.state = {
      showSongs: false,
    };
  }

  showSongs = () => {
    this.setState({
      showSongs: !this.state.showSongs,
    });
  };
  render() {
    return (
      <div className="SavedPlaylist">
        <div className="savedPlaylistHeading">
          <div>
            <h3 onClick={this.showSongs}>
              {this.props.playlist[0].name} - {this.props.playlist[0].artist}
            </h3>
            {this.state.showSongs ? (
              <FontAwesomeIcon icon={faChevronDown} />
            ) : (
              <FontAwesomeIcon icon={faChevronRight} />
            )}
          </div>
          <button
            className="removePlaylist"
            onClick={() => {
              this.props.removePlaylist(this.props.id);
            }}
          >
            REMOVE
          </button>
        </div>
        {this.state.showSongs &&
          this.props.playlist.map((song) => {
            return <Song song={song} />;
          })}
      </div>
    );
  }
}

export default SavedPlaylist;
