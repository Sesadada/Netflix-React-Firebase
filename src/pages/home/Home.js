import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import List from "../../components/list/List";
import Nav from "../../components/nav/Nav";
import "./home.scss";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export const Home = ({
  setCurVid,
  video,
  setVideo,
  docu,
  setDocu,
  movie,
  setMovie,
}) => {
  useEffect(() => {
    onSnapshot(collection(db, "videoclips"), (snapshot) => {
      setVideo(
        snapshot.docs.map((doc) => ({
          title: doc.data().title,
          link: doc.data().link,
          likes: doc.data().likes,
          description: doc.data().description,
          artist: doc.data().artist,
          id: doc.id,
          genre: "videoclip",
        }))
      );
    });

    onSnapshot(collection(db, "movies"), (snapshot) => {
      setMovie(
        snapshot.docs.map((doc) => ({
          title: doc.data().title,
          link: doc.data().link,
          likes: doc.data().likes,
          description: doc.data().description,
          artist: doc.data().artist,
          id: doc.id,
          genre: "movie",
        }))
      );
    });

    onSnapshot(collection(db, "documentaries"), (snapshot) => {
      setDocu(
        snapshot.docs.map((doc) => ({
          title: doc.data().title,
          link: doc.data().link,
          likes: doc.data().likes,
          description: doc.data().description,
          artist: doc.data().artist,
          id: doc.id,
          genre: "documentary",
        }))
      );
    });
  }, []);

  return (
    <div className="home">
      <Nav />
      <Outlet />
      <List type="videoclips" video={video} setCurVid={setCurVid} />
      <List type="documentaries" video={docu} setCurVid={setCurVid} />
      <List type="movies" video={movie} setCurVid={setCurVid} />
    </div>
  );
};
