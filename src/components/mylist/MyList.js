import { useEffect, useState, useRef } from "react";

import {
  updateDoc,
  collection,
  onSnapshot,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import {
  Delete,
  BorderColor,
  FavoriteBorder,
  Favorite,
} from "@material-ui/icons";
import { db } from "../../firebase";
import "./mylist.scss";

const MyList = ({ user }) => {
  const [ismodified, setIsModified] = useState(false);
  const [beingModified, setBeingModified] = useState("");
  const [entries, setEntries] = useState([]);
  const title = useRef(null);
  const text = useRef(null);
  const formRef = useRef();
  const [users, setUsers] = useState([]);
  const [currentInfo, setCurrentInfo] = useState([]);

  const modifyBlog = async (id, blogId) => {
    const currentBlog = entries[id];
    console.log(entries[id]);
    title.current.value = currentBlog.title;
    text.current.value = currentBlog.text;
    setIsModified(true);
    setBeingModified(blogId);
  };
  const deleteBlog = async (blogId) => {
    await deleteDoc(doc(db, "comments", blogId));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    ismodified && deleteBlog(beingModified);

    await addDoc(collection(db, "comments"), {
      title: title.current.value,
      text: text.current.value,
      name: currentInfo.username,
      id: user.uid,
      likes: [],
    });

    formRef.current.reset();
    setIsModified(false);
  };

  const liking = async (entry) => {
    const docRef = doc(db, "comments", entry.blogId);
    await updateDoc(docRef, {
      likes: arrayUnion(`${currentInfo.username}`),
    });
    const snapDoc = await getDoc(docRef);
  };

  const disliking = async (entry) => {
    const docRef = doc(db, "comments", entry.blogId);
    await updateDoc(docRef, {
      likes: arrayRemove(`${currentInfo.username}`),
    });
    const snapDoc = await getDoc(docRef);
  };

  const checkUserLike = (current, entry) => {
    if (entry.likes)
      return entry.likes.includes(current.username) ? false : true;
  };

  useEffect(() => {
    onSnapshot(collection(db, "comments"), (snapshot) => {
      setEntries(
        snapshot.docs.map((doc) => ({
          title: doc.data().title,
          text: doc.data().text,
          name: doc.data().name,
          id: doc.data().id,
          blogId: doc.id,
          likes: doc.data().likes,
        }))
      );
    });
    onSnapshot(collection(db, "users"), (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          username: doc.data().username,
          email: doc.data().email,
          userUID: doc.id,
        }))
      );

      snapshot.docs.filter(
        (doc) =>
          user.email === doc.data().email &&
          setCurrentInfo({
            username: doc.data().username,
            email: doc.data().email,
            userUID: doc.id,
          })
      );
    });
  }, []);

  console.log("users", users);
  console.log("currentInfo", currentInfo);
  return (
    <div className="featured">
      <img
        src="https://images.pexels.com/photos/10051509/pexels-photo-10051509.jpeg?cs=srgb&dl=pexels-%D1%83%D0%BD%D0%B0%D0%B9%D0%B7%D0%B0%D1%82-%D1%8E%D1%88%D0%B0%D0%B5%D0%B2%D0%B0-10051509.jpg&fm=jpg"
        alt=""
      />
      <div className="general">
        <div className="post">
          {entries &&
            entries.map((entry, id) => {
              return (
                <div className="entry" key={id}>
                  <h4>{entry.title}</h4>
                  <p>{entry.text}</p>
                  <small>{entry.name}</small>
                  <br />
                  <div className="allIcons">
                    <div className="likes">
                      {checkUserLike(currentInfo, entry) ? (
                        <FavoriteBorder
                          className="like"
                          onClick={() => liking(entry)}
                        />
                      ) : (
                        <Favorite
                          className="like"
                          onClick={() => disliking(entry)}
                        />
                      )}
                      <div className="number">
                        {entry.likes && entry.likes.length}
                      </div>
                    </div>
                    {entry.id === user.uid && (
                      <div className="icons">
                        <Delete
                          className="icon"
                          onClick={() => deleteBlog(entry.blogId)}
                        />
                        <BorderColor
                          className="icon"
                          onClick={() => modifyBlog(id, entry.blogId)}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    {entry.likes &&
                      entry.likes.length > 0 &&
                      entry.likes.map((like, id) => {
                        return <small key={id}> {like}</small>;
                      })}
                  </div>
                </div>
              );
            })}
        </div>
        <div className="create">
          <h2>Create Blog</h2>
          <form className="form" onSubmit={handleSubmit} ref={formRef}>
            <label>Title</label>
            <input type="text" name="title" ref={title} />
            <label>Message</label>
            <textarea
              ref={text}
              placeholder="Start typing..."
              className="message"
            />
            {!ismodified ? (
              <button type="submit" className="send">
                Publish
              </button>
            ) : (
              <button type="submit" className="send">
                Change
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyList;

/*

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
*/
