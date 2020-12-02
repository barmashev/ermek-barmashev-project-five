import { Component } from "react";
import SuggestedResult from './SuggestedResult'

class SuggestedResults extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  

  render() {
    return (
      <div className="SuggestedResults">
        {this.props.suggestedResultsArray.map(
            ({ name, artist, listeners, mbid }, index) => {
              if (index < 5) {
                return (
                  <SuggestedResult 
                    name={name} 
                    artist={artist} 
                    keyProp={mbid ?mbid :listeners} 
                    getResults={this.props.getResults} 
                    clearSuggestedResults={this.props.clearSuggestedResults}
                  />
                );
              }
              
            }
        )}
      </div>
    );
  }
}

export default SuggestedResults;
