import axios from "axios";
import { Component } from "react";
import SuggestedResults from "./SuggestedResults";

class SearchSection extends Component {
  constructor() {
    super();

    this.state = {
      searchSuggestionsQuery: "",
      suggestedResultsArray: "",
    };
  }

  changeHandler = (e) => {
    e.preventDefault();

    this.setState(
      {
        searchSuggestionsQuery: e.target.value,
      },
      this.getSuggestedResults
    );
  };

  clearSearchQuery = () => {
    this.setState({
      suggestedResultsArray: "",
    });
    document.querySelector("input").value = "";
  };

  getSuggestedResults() {
    if (this.state.searchSuggestionsQuery) {
      axios({
        url: "http://ws.audioscrobbler.com/2.0/",
        responseType: "json",
        method: "GET",
        params: {
          api_key: "f2cbf10980829c7ad5837d9b944630f5",
          track: this.state.searchSuggestionsQuery,
          method: "track.search",
          format: "json",
        },
      }).then((data) => {
        this.setState({
          suggestedResultsArray: data.data.results.trackmatches.track,
        });
      });
    }
  }

  render() {
    return (
      <div className="Search">
        <form action="#">
          <label className="srOnly" htmlFor="search">
            Enter a song
          </label>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter song name"
            onChange={this.changeHandler}
          />
          {this.state.suggestedResultsArray && (
            <SuggestedResults
              suggestedResultsArray={this.state.suggestedResultsArray}
              getResults={this.props.getResults}
              updateSimilarSongsQuery={this.props.updateSimilarSongsQuery}
              clearSuggestedResults={this.clearSearchQuery}
            />
          )}
        </form>
      </div>
    );
  }
}

export default SearchSection;
