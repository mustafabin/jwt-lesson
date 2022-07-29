import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <h1>{user.isLoggedIn ? user.profile.name : "Guest"}</h1>
    </div>
  );
}

export default App;
