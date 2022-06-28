import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import "./listItem.scss";

const ListItem = ({ index, vid, setCurVid, ref }) => {
  const [isHovered, setIsHovered] = useState(false);

  const result = vid.link.match(/[^\/]*$/);

  const handleClick = () => {
    setCurVid(vid.link);
  };

  return (
    <div
      ref={ref}
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (
        <img src={`https://i.ytimg.com/vi/${result[0]}/hqdefault.jpg`} alt="" />
      )}
      {isHovered && (
        <>
          <iframe
            src={vid.link}
            title="Embedded youtube"
            frameBorder="0"
            allowFullScreen
            autoPlay
          />

          <div className="itemInfo">
            <div className="icons">
              <Link
                to="/watch"
                style={{
                  textDecoration: "none",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                <PlayArrow className="icon" onClick={handleClick} />
              </Link>

              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="infoItemTop">
              <span>{vid.artist} </span>
            </div>
            <div className="desc">{vid.description}</div>
            <div className="genre">{vid.genre}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
