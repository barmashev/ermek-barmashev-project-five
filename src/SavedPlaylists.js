import SavedPlaylist from "./SavedPlaylist";
function SavedPlaylists(props) {
  return (
    <div className="SavedPlaylists">
      <div className="secondHeading">
        <h2>You have {props.savedPlaylists.length} saved playlists</h2>
      </div>
      {props.savedPlaylists.map((playlist, index) => {
        return (
          <SavedPlaylist
            playlist={playlist}
            removePlaylist={props.removePlaylist}
            id={props.savedPlaylistsIds[index]}
          />
        );
      })}
    </div>
  );
}

export default SavedPlaylists;
