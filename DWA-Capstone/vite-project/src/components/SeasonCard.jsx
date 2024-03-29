import { Link } from "react-router-dom";

export default function SeasonCard(props) {
  return (
    <Link to={"season/" + props.data.season} className="season-card card">
      <img src={props.data.image} className="season-card--image" />
      <div className="season-card--text">
        <h3 className="season-card--title">{props.data.title}</h3>
        <h4 className="season-card--episodes">
          Episodes: <strong>{props.data.episodes.length}</strong>
        </h4>
      </div>
    </Link>
  );
}
