import { useState, useEffect } from "react";
import { supabase } from "./SignIn";
import { UseContextValue } from "./Context";

/**
 * Component to display episodes.
 * @param {object} props - Component props
 * @param {string} props.email - User email
 * @param {string} props.favouriteSeasonTitle - Title of the favourite season
 * @param {string} props.favouriteShowTitle - Title of the favourite show
 * @param {Function} props.HandleAudioPlay - Function to handle audio playback
 * @returns {JSX.Element} Episodes component
 */
export default function Episodes(props) {
  const { phaseState, favourite } = UseContextValue();

  // State to store favourite data fetched from supabase
  const [favouriteData, setFavouriteData] = useState([]);

  // Fetch favourite data from supabase when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("Favourites")
          .select("*")
          .eq("Email", props.email);
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setFavouriteData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, []);

  // Map episode elements
  const episodeElements = phaseState.Episode.map((item) => {
    const [isButtonClicked, setIsButtonClicked] = useState("NotClicked");

    /**
     * Checks if episode is already added to favourites.
     * @param {string} episodeTitle - Title of the episode
     * @returns {boolean} True if episode is in favourites, false otherwise
     */
    function HandleAddingToFavourites(episodeTitle) {
      return favouriteData.some((book) => book.EpisodeTitle === episodeTitle);
    }

    /**
     * Handles storing episode in favourites.
     * @param {string} title - Title of the episode
     * @param {string} description - Description of the episode
     * @param {number} episodeNumber - Episode number
     * @param {string} file - File URL of the episode
     * @returns {Promise<void>}
     */
    const HandleFavouriteStoring = async (
      title,
      description,
      episodeNumber,
      file
    ) => {
      const Season = props.favouriteSeasonTitle;
      const Show = props.favouriteShowTitle;
      const Email = props.email;
      const EpisodeTitle = title;
      const EpisodeDescription = description;
      const EpisodeNumber = episodeNumber;
      const EpisodeFile = file;
      try {
        setIsButtonClicked("Clicked");
        const { data, error } = await supabase.from("Favourites").insert([
          {
            Season,
            Show,
            EpisodeTitle,
            EpisodeDescription,
            EpisodeNumber,
            EpisodeFile,
            Email,
          },
        ]);

        if (error) {
          console.error("Error inserting data:", error.message);
        } else {
          console.log("Data inserted successfully:", data);
        }
      } catch (error) {
        console.error("Error inserting data:", error.message);
      }
    };

    return (
      <div key={item.episode} className="episodes" title={item.title}>
        <h3>{item.title}</h3>
        <p>Episode: {item.episode}</p>
        <div className="EpisodeButtons">
          {isButtonClicked === "Clicked" ? (
            <img
              src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
              className="LikeImage"
            />
          ) : (
            HandleAddingToFavourites(item.title) && (
              <img
                src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png"
                className="LikeImage"
              />
            )
          )}
          <button
            id={item.file}
            title={item.title}
            data-description={item.description}
            data-episodenumber={item.episode}
            data-showtitle={favourite.favouriteShowTitle}
            data-seasontitle={favourite.favouriteSeasonTitle}
            onClick={props.HandleAudioPlay}
          >
            Play
          </button>
          {isButtonClicked === "Clicked" ? (
            <button disabled={true}>Add To Favorites</button>
          ) : (
            <button
              disabled={HandleAddingToFavourites(item.title)}
              onClick={() =>
                HandleFavouriteStoring(
                  item.title,
                  item.description,
                  item.episode,
                  item.file
                )
              }
            >
              Add To Favorites
            </button>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="episodeSection">
      <h1 className="seasonTitleOfEpisodes">{props.favouriteSeasonTitle}</h1>
      {episodeElements}
    </div>
  );
}
