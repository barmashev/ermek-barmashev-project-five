import youtubeLogo from "./assets/youtube.png";
import spotifyLogo from "./assets/spotify.png";
function Song(props) {
  return (
    <li key={props.song.playcount} className="song">
      <p>
        {props.song.artist} - {props.song.name}
      </p>
      <div>
        <a
          href={`https://www.youtube.com/results?search_query=${props.song.artist}+${props.song.name}`}
          target="_blank"
        >
          <img src={youtubeLogo} alt="youtube logo" />
        </a>
        <a
          href={`https://open.spotify.com/search/${props.song.artist} ${props.song.name}`}
          target="_blank"
        >
          <img src={spotifyLogo} alt="spotify logo" />
        </a>
        <button
          onClick={(e) => {
            props.removeSong(props.index, e);
          }}
        >
          Remove
        </button>
      </div>
    </li>
  );
}

export default Song;
