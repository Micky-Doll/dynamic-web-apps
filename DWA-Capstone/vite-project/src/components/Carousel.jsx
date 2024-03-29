import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../App.css";
import { Link } from "react-router-dom";

const CarouselPage = (props) => {
  return (
    <Carousel className="carousel">
      <Link to={`show/` + props.details[0].id}>
        <div>
          <img className="carousel--img" src={props.details[0].image} />
          <p className="legend">{props.details[0].title}</p>
        </div>
      </Link>

      <Link to={`show/` + props.details[1].id}>
        <div>
          <img className="carousel--img" src={props.details[1].image} />
          <p className="legend">{props.details[1].title}</p>
        </div>
      </Link>

      <Link to={`show/` + props.details[2].id}>
        <div>
          <img className="carousel--img" src={props.details[2].image} />
          <p className="legend">{props.details[2].title}</p>
        </div>
      </Link>
    </Carousel>
  );
};

export default CarouselPage;
