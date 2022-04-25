import { useRef, useState } from "react";
import ListItem from "../../components/listItem/ListItem";
import {
  ArrowBackIosOutlined,
  ArrowForwardIosOutlined,
} from "@material-ui/icons";
import "./list.scss";
import { db } from "../../firebase";

const List = ({ type, video, setCurVid }) => {
  const listRef = useRef();
  const [slideNum, setSlideNum] = useState(0);
  const [ismoved, setIsMoved] = useState(false);

  const handleClick = (direction) => {
    setIsMoved(true);
    let distance = listRef.current.getBoundingClientRect().x - 50;
    if (direction === "left" && slideNum > 0) {
      setSlideNum(slideNum - 1);
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
    }
    if (direction === "right" && slideNum < 5) {
      setSlideNum(slideNum + 1);
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
    }
  };
  return (
    <div className="list">
      <span className="listTitle">{type}</span>
      <div className="wrapper">
        <ArrowBackIosOutlined
          className="sliderArrow left"
          onClick={() => handleClick("left")}
          style={{ display: !ismoved && "none" }}
        />
        <div className="container" ref={listRef}>
          {video &&
            video.map((vid, id) => {
              return (
                <ListItem index={id} vid={vid} key={id} setCurVid={setCurVid} />
              );
            })}
        </div>
        <ArrowForwardIosOutlined
          className="sliderArrow right"
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  );
};

export default List;
