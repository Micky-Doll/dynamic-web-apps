import { UseContextValue } from "./Context";
import { GenderToString } from "./Root";

export default function Carousel() {
  const {
    phaseState,
    setPhase,
    setFavourite,
    setPhaseState,
    setShowImage,
    setShowDescription,
  } = UseContextValue();

  async function handlePreviewClick(
    showTitle,
    showId,
    showImg,
    showDescription
  ) {
    if (!showId) return;

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
      setShowDescription(showDescription);
    } catch (error) {
      console.error("Error fetching Preview data:", error.message);
    }
  }

  const previewElements = phaseState.DefaultPreview.slice(17, 30).map(
    (item) => {
      const updatedDate = new Date(item.updated);

      return (
        <button
          key={item.id}
          className="showItem"
          id={item.id}
          onClick={() =>
            handlePreviewClick(
              item.title,
              item.id,
              item.image,
              item.description
            )
          }
          title={item.title}
          value={item.description}
          data-image={item.image}
        >
          <img src={item.image} alt={item.title} />
          <p>{item.title}</p>
          <p>Seasons: {item.seasons}</p>
          <p>Gender: {item.genres.map(GenderToString).join(", ")}</p>
          <p>Updated: {updatedDate.toLocaleDateString("en-GB")}</p>
        </button>
      );
    }
  );

  return <div className="scroll-Container">{previewElements}</div>;
}
