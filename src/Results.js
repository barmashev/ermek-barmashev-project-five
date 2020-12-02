import { Component } from "react";
import Song from "./Song";

class Results extends Component {
  constructor() {
    super();
    this.state = {};
  }

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
          </div>
        </div>
        <ul>
          {this.props.results.map((songObject, index) => {
            return <Song song={songObject} index={index} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Results;
