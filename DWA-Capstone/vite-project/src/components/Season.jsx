import Episode from "./Episode";
import { useGetFavouritesQuery } from "../services/database.js";
import { supabase } from "../client.js";
import { setWhatIsPlaying, startPlaying } from "../slices/audioSlice.js";
import { useDispatch, useSelector } from "react-redux";

const user = await supabase.auth.getUser();
function Season(props) {
  const { data, refetch } = useGetFavouritesQuery(user.data.user.id);
  const dispatch = useDispatch();
  function handleClick(episode) {
    dispatch(
      setWhatIsPlaying({
        ...episode,
        ...{
          season: props.data.season,
          podcast_id: props.podcast_id,
        },
      })
    );
  }

  const toggleFavourite = (episode, isFavourite) => {
    isFavourite ? asyncRemoveFavourite(episode) : asyncAddFavourite(episode);
  };
  const asyncAddFavourite = async (episode) => {
    const { error } = await supabase.from("favourites").insert([
      {
        podcast_id: props.podcast_id,
        season: props.data.season,
        episode: episode,
        episode_title: props.data.episodes[episode - 1].title,
        img_file: props.data.image,
        audio_file: props.data.episodes[episode - 1].file,
        podcast_name: props.showName,
      },
    ]);
    refetch();
  };
  const asyncRemoveFavourite = async (episode) => {
    const { error } = await supabase
      .from("favourites")
      .delete()
      .eq("podcast_id", props.podcast_id)
      .eq("season", props.data.season)
      .eq("episode", episode);
    refetch();
  };
  const isFavourite = (episode) => {
    return data?.some((item) => {
      return (
        item.season === props.data.season &&
        item.episode === episode.episode &&
        item.podcast_id === parseInt(props.podcast_id)
      );
    });
  };
  const episodePreviews = props.data.episodes.map((episode) => {
    return (
      <Episode
        data={episode}
        key={episode.episode}
        image={props.data.image}
        showName={props.showName}
        seasonNum={props.data.title.replace(" ", "-")}
        handleClick={handleClick}
        toggleFavourite={toggleFavourite}
        isFavourite={isFavourite(episode)}
      />
    );
  });

  return <main>{episodePreviews}</main>;
}

export default Season;
