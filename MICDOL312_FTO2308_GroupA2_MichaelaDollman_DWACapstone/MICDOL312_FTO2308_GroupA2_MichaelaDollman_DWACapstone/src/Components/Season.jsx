import { UseContextValue } from "./Context";

/**
 * Component to display seasons.
 * @returns {JSX.Element} Season component
 */
export default function Season() {
  const {
    phaseState,
    setPhaseState,
    setPhase,
    setFavourite,
    showDescription,
    showImage,
  } = UseContextValue();

  /**
   * Handles click event on a season item.
   * @param {string} seasonTitle - Title of the season
   * @param {number} seasonId - ID of the season
   * @returns {void}
   */
  function HandleSeasonClick(seasonTitle, seasonId) {
    try {
      const seasonArray = phaseState.Season[seasonId].episodes;
      setPhaseState((prevState) => ({
        ...prevState,
        Episode: seasonArray,
      }));
      setFavourite((prevState) => ({
        ...prevState,
        favouriteSeasonTitle: seasonTitle,
      }));
      setPhase("episodePhase");
    } catch (error) {
      console.error("Error fetching Preview data:", error.message);
    }
  }

  // Map season elements
  const seasonElements = phaseState.Season.map((item) => {
    return (
      <button
        key={item.season - 1}
        className="showItem"
        onClick={() => HandleSeasonClick(item.title, item.season - 1)}
      >
        <img src={item.image} />
        <p>{item.title}</p>
        <p>Episodes: {item.episodes.length}</p>
      </button>
    );
  });

  return (
    <div className="seasonSection">
      {
        <>
          <div className="SeasonInfo">
            <img src={showImage} className="SeasonDescriptionImage" />
            <div className="SeasonDescription">{showDescription}</div>
          </div>
          <div className="seasonDivs">{seasonElements}</div>
        </>
      }
    </div>
  );
}
