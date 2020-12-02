import SavedPlaylist from "./SavedPlaylist";
function SavedPlaylists(props) {
  return (
    <div className="SavedPlaylists">
      <div className="secondHeading">
        <h2>You have {props.savedPlaylists.length} saved playlists</h2>
      </div>
      {props.savedPlaylists.map((playlist) => {
        return <SavedPlaylist playlist={playlist} />;
      })}
    </div>
  );
}

export default SavedPlaylists;
