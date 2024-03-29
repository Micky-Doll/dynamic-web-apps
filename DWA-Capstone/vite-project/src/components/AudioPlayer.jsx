import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { supabase } from "../client.js";
import { useGetAudioSessionQuery } from "../services/database.js";
import { setWhatIsPlaying } from "../slices/audioSlice.js";
const {
  data: { user },
} = await supabase.auth.getUser();

export default function AudioPlayer() {
  const showPlayer = useSelector(
    (state) => !!state.audio.whatIsPlaying?.file ?? false
  );
  const episode = useSelector((state) => state.audio.whatIsPlaying);
  const dispatch = useDispatch();
  const { data, isSuccess } = useGetAudioSessionQuery(user.id, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (showPlayer) {
      document.getElementsByClassName("audio-player--audio")[0].currentTime =
        episode?.timestamp ?? 0;
      if ((data[0]?.title ?? "") !== episode.title) {
        document.getElementsByClassName("audio-player--audio")[0].play();
      }
    }
  }, [episode]);

  useEffect(() => {
    if (isSuccess && data.length) {
      dispatch(setWhatIsPlaying(data[0]));
    }
  }, [data]);
  const setAudioSession = async (episode, timestamp) => {
    const { data, error } = await supabase.from("audio_session").upsert({
      user_id: user.id,
      podcast_id: parseInt(episode.podcast_id),
      season: episode.season,
      episode: episode.episode,
      timestamp: timestamp,
      file: episode.file,
      title: episode.title,
    });
  };
  useEffect(() => {
    const audioSessionSetter = setInterval(() => {
      if (showPlayer) {
        setAudioSession(
          episode,
          Math.floor(
            document.getElementsByClassName("audio-player--audio")[0]
              .currentTime
          )
        );
      }
    }, 5000);
    return () => clearInterval(audioSessionSetter);
  }, [showPlayer, episode]);

  if (showPlayer) {
    return (
      <div className="audio-player">
        <h3 className="audio-player--title">{episode.title}</h3>
        <audio className="audio-player--audio" controls={true}>
          <source src={episode.file} />
        </audio>
      </div>
    );
  }
  return <div></div>;
}
