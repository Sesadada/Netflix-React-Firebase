import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import { Link, useNavigate } from "react-router-dom";

import "./feautured.scss";

const Featured = ({ curVid }) => {
  console.log(curVid.link);
  return (
    <div className="featured">
      <img
        src="https://images.pexels.com/photos/10051509/pexels-photo-10051509.jpeg?cs=srgb&dl=pexels-%D1%83%D0%BD%D0%B0%D0%B9%D0%B7%D0%B0%D1%82-%D1%8E%D1%88%D0%B0%D0%B5%D0%B2%D0%B0-10051509.jpg&fm=jpg"
        alt=""
      />
      <div>
        <iframe
          src={curVid.link}
          title="Embedded youtube"
          frameBorder="0"
          allowFullScreen
          autoPlay
        />
      </div>
      <div className="info">
        <h1>{curVid && curVid.title}</h1>
        <span className="desc">{curVid && curVid.description}</span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>
              {" "}
              <Link
                to="/watch"
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Play
              </Link>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;

/*

      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movie" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="comedy">Sci-Fi</option>
            <option value="sci-fi">Crime</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
*/
