import { ArrowBackIosOutlined } from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./watch.scss";
import ReactPlayer from "react-player";

const Watch = ({ video }) => {
  const final = video && typeof video === "string" ? video : video.link;
  return (
    <div className="watch">
      <div className="back">
        <Link
          to="/home"
          style={{
            textDecoration: "none",
            fontWeight: "bold",
          }}
          className="back"
        >
          <ArrowBackIosOutlined />
          Home
        </Link>
      </div>
      <ReactPlayer
        url={final}
        className="video"
        width="100%"
        height="100%"
        playing={true}
      />
    </div>
  );
};

export default Watch;
