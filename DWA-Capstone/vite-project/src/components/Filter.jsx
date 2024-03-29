export default function Filter(props) {
  const dropDownOptions = ["Default", "A-Z", "Z-A", "Newest", "Oldest"];

  const dropDown = dropDownOptions.map((option) => {
    return (
      <option value={option} key={option}>
        {option}
      </option>
    );
  });

  return (
    <div className="filter">
      <div className="filter--select">
        <label>Sort by:</label>
        <select defaultValue="Default" onChange={props.handleFilterSelect}>
          {dropDown}
        </select>
      </div>
      <div className="filter--search">
        <label htmlFor="stringSearch">Or Search for:</label>
        <input
          placeholder="Search"
          type="text"
          onChange={(event) => {
            props.handleFilterSearch(event);
          }}
          id="stringSearch"
          name="stringSearch"
        />
      </div>
    </div>
  );
}
