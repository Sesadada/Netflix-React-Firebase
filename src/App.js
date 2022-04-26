import { useState, useEffect } from "react";
import "./app.scss";
import Watch from "./pages/watch/Watch";
import { Home } from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import MyList from "./components/mylist/MyList";
import Featured from "./components/featured/Featured";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { auth } from "./firebase";
import { db } from "./firebase";
import { collection, onSnapshot } from "firebase/firestore";
import ProtectedRoutes from "./ProtectedRoutes";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [logged, setLogged] = useState(false);
  const [user, setUser] = useState("");
  const [currentUsername, setCurrentUsername] = useState("");
  const [currentVideo, setCurrentVideo] = useState("");
  const [video, setVideo] = useState([]);
  const [docu, setDocu] = useState([]);
  const [movie, setMovie] = useState([]);
  const [featGenre, setFeatGenre] = useState("");

  onAuthStateChanged(auth, (current) => {
    setUser(current);
    //setFeatGenre(getFeat());
    current && setLogged(true);
    //console.log(logged);
    //console.log(user);
  });

  const getFeat = () => {
    const numb = Math.floor(Math.random() * 3);
    const genre = ["documentaries", "movies", "videoclips"];
    const final = genre[numb];
    return final;
  };

  useEffect(() => {
    onSnapshot(collection(db, "videoclips"), (snapshot) => {
      const numb = Math.floor(Math.random() * snapshot.docChanges().length);
      console.log(snapshot.docs[numb].data());
      setCurrentVideo(snapshot.docs[numb].data());
    });
  }, []);
  return (
    <Router basename="/Netflix-React-Firebase">
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/register"
            element={
              <Register
                currentUsername={currentUsername}
                setCurrentUsername={setCurrentUsername}
              />
            }
          />
          <Route element={<ProtectedRoutes />}>
            <Route
              path="/home"
              element={
                <Home
                  setCurVid={setCurrentVideo}
                  video={video}
                  setVideo={setVideo}
                  docu={docu}
                  setDocu={setDocu}
                  movie={movie}
                  setMovie={setMovie}
                />
              }
            >
              <Route path="mylist" element={<MyList user={user} />} />
              <Route path="" element={<Featured curVid={currentVideo} />} />
            </Route>
            <Route path="/watch" element={<Watch video={currentVideo} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
