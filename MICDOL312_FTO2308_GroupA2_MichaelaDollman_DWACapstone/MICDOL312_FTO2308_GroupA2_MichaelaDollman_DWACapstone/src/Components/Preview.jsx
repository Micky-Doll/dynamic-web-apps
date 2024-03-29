import { GenderToString } from "./Root";
import { UseContextValue } from "./Context";

/**
 * Component to display preview items.
 * @returns {JSX.Element} Preview component
 */
export function Preview() {
  const {
    phaseState,
    setPhase,
    setFavourite,
    setPhaseState,
    setShowImage,
    setShowDescription,
  } = UseContextValue();

  /**
   * Handles click event on a preview item.
   * @param {string} showTitle - Title of the show
   * @param {string} showId - ID of the show
   * @param {string} showImg - Image URL of the show
   * @param {string} showDescript - Description of the show
   * @returns {void}
   */
  async function HandlePreviewClick(showTitle, showId, showImg, showDescript) {
    if (showId) {
      try {
        const response = await fetch(
          `https://podcast-api.netlify.app/id/${showId}`
        );
        const data = await response.json();
        setPhaseState((prevState) => ({
          ...prevState,
          Season: data.seasons,
        }));
        setFavourite((prevState) => ({
          ...prevState,
          favouriteShowTitle: showTitle,
        }));
        setPhase("seasonPhase");
        setShowImage(showImg);
        setShowDescription(showDescript);
      } catch (error) {
        console.error("Cannot get Preview Data:", error.message);
      }
    }
  }

  const previewElements = phaseState.Preview.map((item) => {
    const UpdatedDate = new Date(item.updated);
    return (
      <button
        key={item.id}
        className="showItem"
        onClick={() =>
          HandlePreviewClick(item.title, item.id, item.image, item.description)
        }
      >
        <img src={item.image} />
        <p>{item.title}</p>
        <p>Seasons: {item.seasons}</p>
        <p>Gender: {item.genres.map(GenderToString).join(", ")}</p>
        <p>Updated: {UpdatedDate.toLocaleDateString("en-GB")}</p>
      </button>
    );
  });

  return (
    <>
      {phaseState.Preview.length !== 0 ? (
        <div className="previewDiv">{previewElements}</div>
      ) : (
        <h1>No Search Result</h1>
      )}
    </>
  );
}

/**
 * Component for the back button.
 * @returns {JSX.Element} BackButton component
 */
export function BackButton() {
  const { phase, setPhase } = UseContextValue();

  /**
   * Handles click event on the back button.
   * @returns {void}
   */
  function HandleBack() {
    if (phase === "seasonPhase") {
      setPhase("previewPhase");
    } else if (phase === "episodePhase") {
      setPhase("seasonPhase");
    } else if (phase === "previewPhase") {
      setPhase("signUpPhase");
    } else if (phase === "favouritePhase") {
      setPhase("previewPhase");
    } else if (phase === "historyPhase") {
      setPhase("previewPhase");
    }
  }

  return (
    <button className="backButton" onClick={HandleBack}>
      {phase === "previewPhase" ? "LOGOUT" : "BACK"}
    </button>
  );
}
