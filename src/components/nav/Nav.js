import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowDropDown, Notifications, Search } from "@material-ui/icons";
import "./nav.scss";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "@firebase/auth";

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [changing, setChanging] = useState(0);
  onAuthStateChanged(auth, (current) => {
    setCurrentUser(current);
  });

  const logout = async () => {
    await signOut(auth);
    return;
  };
  window.onscroll = () => {
    const final = (window.pageYOffset / (window.innerHeight + 100)).toFixed(1);
    setChanging(final);
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div
      className={isScrolled ? "navbar scrolled" : "navbar"}
      style={{ backgroundColor: `rgb(0,0,0, ${changing})` }}
    >
      <div className="container">
        <div className="left">
          <Link
            to="/home"
            style={{
              textDecoration: "none",
              color: "white",
              fontWeight: "bold",
            }}
          >
            <h1 className="img">FILMBIURÓ</h1>
          </Link>

          <span>Series</span>
          <span>Movies</span>
          <span>Documentaries</span>
          <span>
            {" "}
            <Link
              to="/home/mylist"
              style={{
                textDecoration: "none",
                color: "white",
                fontWeight: "bold",
              }}
            >
              My Blog
            </Link>
          </span>
        </div>
        <div className="right">
          <span>
            {currentUser
              ? `User logged in : ${currentUser?.email}`
              : "User logged out"}
          </span>

          <div className="profile">
            <ArrowDropDown className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={logout}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Log out
                </Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
