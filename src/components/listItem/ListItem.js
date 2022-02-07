import { useState } from "react";
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import "./listItem.scss";

const ListItem = ({ index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const trailer =
    "https://www.youtube.com/embed/c_dNIXwrbzY?autoplay=1&mute=1&controls=0&modestbranding=1";
  return (
    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {!isHovered && (
        <img
          src="https://orgoglionerd.it/wp-content/uploads/2019/12/kill-bill.jpg"
          alt=""
        />
      )}
      {isHovered && (
        <>
          <iframe
            src={trailer}
            title="Embedded youtube"
            frameBorder="0"
            allowFullScreen
            autoplay
          />

          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon" />
              <ThumbUpAltOutlined className="icon" />
              <ThumbDownOutlined className="icon" />
            </div>
            <div className="infoItemTop">
              <span>1 hour 14 mins </span>
              <span className="limit">+16</span>
              <span>1999</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil,
              quam.
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
