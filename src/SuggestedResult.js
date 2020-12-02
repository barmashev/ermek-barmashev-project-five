function SuggestedResult(props) {
  const { artist, name, keyProp, getResults, clearSuggestedResults } = props;
  return (
    <div
      className="SuggestedResult"
      key={keyProp}
      onClick={() => {
        document.querySelector(".wrapper").classList.add("animated");
        setTimeout(() => {
          getResults(artist, name);
          clearSuggestedResults();
        }, 500);
      }}
    >
      <p>
        {artist} - {name}
      </p>
    </div>
  );
}

export default SuggestedResult;
