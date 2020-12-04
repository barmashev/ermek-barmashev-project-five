import { Component } from "react";
import SuggestedResult from "./SuggestedResult";

function SuggestedResults(props) {
  return (
    <div className="SuggestedResults">
      {props.suggestedResultsArray.map(
        ({ name, artist, listeners, mbid }, index) => {
          if (index < 5) {
            return (
              <SuggestedResult
                name={name}
                artist={artist}
                keyProp={mbid ? mbid : listeners}
                getResults={props.getResults}
                clearSuggestedResults={props.clearSuggestedResults}
              />
            );
          }
        }
      )}
    </div>
  );
}

export default SuggestedResults;
