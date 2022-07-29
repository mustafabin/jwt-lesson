import "./App.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./redux/userReducer.js";
import Login from "./Login.jsx";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    let token = localStorage.getItem("jwt");
    let grabProfile = () => {
      let headerInfo = {
        Accept: "application/json",
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      fetch("http://localhost:3000/profile", headerInfo)
        .then((res) => res.json())
        .then((data) =>
          data["error"]
            ? alert(data["error"])
            : dispatch(
                setUser({
                  profile: data,
                })
              )
        );
    };
    //If the user got logged out and there is a token in local storage
    //Attempt to log them back in
    if (!user.isLoggedIn && token) grabProfile();
  }, [user]);
  return (
    <div className="App">
      <h1>
        Hello,
        <span style={{ color: "red" }}>
          {user.isLoggedIn ? user.profile.name : "Guest"}
        </span>
      </h1>
      <Login />
    </div>
  );
}

export default App;
