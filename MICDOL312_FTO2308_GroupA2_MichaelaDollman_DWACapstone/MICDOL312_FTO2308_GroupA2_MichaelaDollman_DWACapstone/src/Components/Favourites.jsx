import { useState, useEffect } from "react";
import { supabase } from "./SignIn";

/**
 * Component to display user's favorite episodes.
 * @param {object} props - Component props
 * @param {string} props.email - User email
 * @param {Function} props.HandleAudioPlay - Function to handle audio playback
 * @returns {JSX.Element} Favorites component
 */
export default function Favorites(props) {
  const [favouriteData, setFavouriteData] = useState([]);
  const [state, setState] = useState("loading");
  const [sortState, setSortState] = useState("originData");
  const [sortPhase, setSortPhase] = useState([]);

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
          setState("favourites");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [favouriteData]);

  /**
   * Deletes a favorite episode from the database.
   * @param {string} title - Title of the episode to be deleted
   * @returns {Promise<void>}
   */
  const handleDelete = async (title) => {
    setSortState("originData");
    const { data, error } = await supabase
      .from("Favourites")
      .delete()
      .eq("EpisodeTitle", title)
      .eq("Email", props.email);

    if (error) {
      console.log(error);
    }
    if (data) {
      // Handle success
    }
  };

  /**
   * Sorts favorite episodes in ascending order.
   */
  function sortByAscending() {
    setSortState("sortByAscending");
    setSortPhase(favouriteData.sort((a, b) => b.Show.localeCompare(a.Show)));
  }

  /**
   * Sorts favorite episodes in descending order.
   */
  function sortByDescending() {
    setSortState("sortByDescending");
    setSortPhase(favouriteData.sort((a, b) => a.Show.localeCompare(b.Show)));
  }

  /**
   * Sorts favorite episodes by latest addition.
   */
  function sortByLatest() {
    setSortState("sortByLatest");
    setSortPhase(
      favouriteData.sort(
        (a, b) => new Date(a.TimeStamp) - new Date(b.TimeStamp)
      )
    );
  }

  /**
   * Sorts favorite episodes by oldest addition.
   */
  function sortByOldest() {
    setSortState("sortByOldest");
    setSortPhase(
      favouriteData.sort(
        (a, b) => new Date(b.TimeStamp) - new Date(a.TimeStamp)
      )
    );
  }

  // Map favorite episode elements
  const favouriteElements = (
    sortState === "originData" ? favouriteData : sortPhase
  ).map((item) => {
    const AddedDate = new Date(item.TimeStamp);
    return (
      <div key={item.id} className="episodes">
        <p>Show: {item.Show}</p>
        <p>Seasons: {item.Season}</p>
        <p>Title: {item.EpisodeTitle}</p>
        <p>Episode: {item.EpisodeNumber}</p>
        <p>
          Added:{" "}
          {AddedDate.toLocaleDateString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <div className="favButtons">
          <button onClick={() => handleDelete(item.EpisodeTitle)}>
            DELETE
          </button>
          <button
            id={item.EpisodeFile}
            title={item.EpisodeTitle}
            data-episodenumber={item.EpisodeNumber}
            data-showtitle={item.Show}
            data-seasontitle={item.Season}
            onClick={props.HandleAudioPlay}
          >
            Play
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="SortNav">
        <button onClick={sortByAscending}>A-Z</button>
        <button onClick={sortByDescending}>Z-A</button>
        <button onClick={sortByLatest}>Latest</button>
        <button onClick={sortByOldest}>Oldest</button>
      </div>
      <div className="favouriteSection">
        <h1 className="favTitle">FAVOURITES</h1>
        {state === "loading" ? (
          <div>{"LOADING..."}</div>
        ) : favouriteData.length === 0 ? (
          <h1>No Favourites Available</h1>
        ) : (
          <div className="favourites">{favouriteElements}</div>
        )}
      </div>
    </>
  );
}
