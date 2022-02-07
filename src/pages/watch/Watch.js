import { ArrowBackIosOutlined } from "@material-ui/icons";
import "./watch.scss";

const Watch = () => {
  const trailer =
    "https://www.youtube.com/embed/c_dNIXwrbzY?autoplay=1&mute=1&controls=1&modestbranding=1";

  return (
    <div className="watch">
      <div className="back">
        <ArrowBackIosOutlined />
        Home
      </div>
      <iframe
        className="video"
        src={trailer}
        title="Embedded youtube"
        frameBorder="0"
        allowFullScreen
        autoplay
      />
    </div>
  );
};

export default Watch;
