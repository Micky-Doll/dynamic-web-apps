import { useEffect } from "react";
import { UseContextValue } from "./Context";

/**
 * Component for searching and sorting previews.
 * @returns {JSX.Element} SearchSorting component
 */
export function SearchSorting() {
  const { phaseState, setPhaseState, search, setSearch } = UseContextValue();

  useEffect(() => {
    search &&
      setPhaseState((prevPhase) => ({
        ...prevPhase,
        Preview: phaseState.DefaultPreview.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        ),
      }));
  }, [search]);

  return (
    <input
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search..."
      value={search}
      type="text"
    />
  );
}

/**
 * Component for sorting previews by different criteria.
 * @returns {JSX.Element} PreviewSorting component
 */
export function PreviewSorting() {
  const { phaseState, setPhaseState } = UseContextValue();

  /**
   * Sorts previews by selected gender.
   * @param {Event} event - The event object
   */
  function SortByGender(event) {
    const selectedGenre = parseInt(event.target.value);
    setPhaseState((prevPhase) => ({
      ...prevPhase,
      Preview: phaseState.DefaultPreview.filter((item) =>
        item.genres.includes(selectedGenre)
      ),
    }));
  }

  /**
   * Sorts previews in ascending order by title.
   */
  function sortByAscending() {
    setPhaseState((prevPhase) => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    }));
  }

  /**
   * Sorts previews in descending order by title.
   */
  function sortByDescending() {
    setPhaseState((prevPhase) => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort((a, b) =>
        b.title.localeCompare(a.title)
      ),
    }));
  }
  /**
   * Sorts previews by latest update date.
   */
  function sortByLatest() {
    setPhaseState((prevPhase) => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort(
        (a, b) => new Date(b.updated) - new Date(a.updated)
      ),
    }));
  }
  /**
   * Sorts previews by oldest update date.
   */
  function sortByOldest() {
    setPhaseState((prevPhase) => ({
      ...prevPhase,
      Preview: phaseState.Preview.sort(
        (a, b) => new Date(a.updated) - new Date(b.updated)
      ),
    }));
  }

  return (
    <div className="SortNav">
      <button onClick={sortByAscending}>A-Z</button>
      <button onClick={sortByDescending}>Z-A</button>
      <button onClick={sortByLatest}>Latest</button>
      <button onClick={sortByOldest}>Oldest</button>
      <button value={7} onClick={SortByGender}>
        Fiction
      </button>
      <button value={3} onClick={SortByGender}>
        History
      </button>
      <button value={5} onClick={SortByGender}>
        Entertainment
      </button>
    </div>
  );
}
