import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./feautured.scss";

const Featured = ({ type }) => {
  return (
    <div className="featured">
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
      <img
        src="https://images.pexels.com/photos/10051509/pexels-photo-10051509.jpeg?cs=srgb&dl=pexels-%D1%83%D0%BD%D0%B0%D0%B9%D0%B7%D0%B0%D1%82-%D1%8E%D1%88%D0%B0%D0%B5%D0%B2%D0%B0-10051509.jpg&fm=jpg"
        alt=""
      />
      <div className="info">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Kill_Bill_%28logo%29.png"
          alt=""
        />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quam
          deserunt cumque culpa quisquam dolorum harum, pariatur eaque error
          illum?
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
