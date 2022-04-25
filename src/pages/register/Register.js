import "./register.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import "firebase/firestore";

const Register = ({ currentUsername, setCurrentUsername }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsvisible] = useState("");
  const [valideUser, setValideUser] = useState("");
  const [message, setMessage] = useState("");

  function validateEmail(elementValue) {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(elementValue);
  }
  const checkemail = (str) => {
    if (validateEmail(str)) {
      setIsvisible("yes");
      setMessage("");
    } else {
      console.log("not valid");
      setMessage("You have to enter a valid email");
    }
  };

  const checkUser = (e) => {
    e.preventDefault();
    setValideUser("user");
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const currentUser = auth.currentUser;
      console.log(currentUser);
      await setDoc(doc(db, "users", currentUser.uid), {
        username: currentUsername,
        email: email,
      });

      navigate("/home");
    } catch (error) {
      console.log(error.message);

      setMessage(error.message);
    }
    return;
  };

  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt=""
            className="logo"
          />

          <Link to="/">
            <button className="loginButton"> Log In</button>
          </Link>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited Movies, TV Shows, and more.</h1>
        <h2>Watch anywher. Cancel anytime</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!isVisible ? (
          <div className="inputi">
            <input
              type="email"
              placeholder="email address"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="registerButton"
              onClick={() => checkemail(email)}
            >
              Get Started
            </button>
          </div>
        ) : !valideUser ? (
          <div className="inputi">
            <input
              value={currentUsername}
              type="text"
              placeholder="username"
              onChange={(e) => setCurrentUsername(e.target.value)}
            />

            <button className="registerButton" onClick={(e) => checkUser(e)}>
              {" "}
              Continue
            </button>
          </div>
        ) : (
          <form className="inputi">
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="registerButton"
              onClick={(e) => register(e)}
            >
              {" "}
              Start
            </button>
          </form>
        )}
        {message && (
          <small style={{ color: "white", marginTop: "10px" }}>{message}</small>
        )}
      </div>
    </div>
  );
};

export default Register;

/*
      const user = await createUserWithEmailAndPassword(auth, email, password);
   
      console.log(user);

      await addDoc(collection(db, "users"), {
        username: currentUsername,
        email: email,
      });

      navigate("/home");

*/
