import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import Nav from "../../components/nav/Nav";
import "./home.scss";

export const Home = () => {
  return (
    <div className="home">
      <Nav />
      <Featured type="series" />
      <List />
      <List />
      <List />
    </div>
  );
};
