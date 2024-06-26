import { useState, useEffect } from "react";
import { supabase } from "./SignIn";

/**
 * Component to display user's listen history.
 * @param {object} props - Component props
 * @param {string} props.email - User email
 * @returns {JSX.Element} History component
 */
export default function History(props) {
  const [historyData, setHistoryData] = useState([]);
  const [state, setState] = useState("loading");

  /**
   * Fetches listen history data from the database.
   * @returns {void}
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("History")
          .select("*")
          .eq("Email", props.email);
        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setHistoryData(data);
          setState("History");
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData(); // Call the function to fetch data when the component mounts
  }, [props.email]);

  /**
   * Handles resetting listen history.
   * @returns {void}
   */
  const handleReset = async () => {
    try {
      const { error } = await supabase
        .from("History")
        .delete()
        .eq("Email", props.email);

      if (error) {
        console.error("Error deleting data:", error.message);
      } else {
        setHistoryData([]); // Reset historyData state
      }
    } catch (error) {
      console.error("Error deleting data:", error.message);
    }
  };

  // Map history elements
  const historyElements = historyData.map((item) => {
    const AddedDate = new Date(item.TimeStamp);
    return (
      <button key={item.id} className="episodes">
        <p>Show: {item.Show}</p>
        <p>Seasons: {item.Season}</p>
        <p>Title: {item.EpisodeTitle}</p>
        <p>Episode: {item.EpisodeNumber}</p>
        <p>
          Updated:{" "}
          {AddedDate.toLocaleDateString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </button>
    );
  });

  return (
    <div className="HistorySection">
      <h1 className="HistoryTitle">Listen History</h1>
      <button className="resetButton" onClick={handleReset}>
        Clear All
      </button>
      {state === "loading" ? (
        <div>{"LOADING..."}</div>
      ) : historyData.length === 0 ? (
        <h1>No History Available</h1>
      ) : (
        <div className="history">{historyElements}</div>
      )}
    </div>
  );
}
